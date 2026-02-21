'use client';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  writeBatch,
} from 'firebase/firestore';
import { auth, firestore } from '../firebase';


const provider = new GoogleAuthProvider();

export function getFirebaseAuthErrorMessage(error: any): string {
    const errorCode = error.code || 'unknown';

    // Prioritize the detailed, custom error message from manageUserProfile
    if (error.message && error.message.startsWith('Failed to save user profile')) {
        return error.message;
    }

    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email address is already in use by another account.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled in your Firebase project.';
        case 'auth/weak-password':
            return 'The password is too weak. It must be at least 6 characters long.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/user-disabled':
            return 'Invalid email or password. Please try again.';
        case 'auth/too-many-requests':
            return 'Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.';
        case 'auth/network-request-failed':
            return 'A network error occurred. Please check your internet connection.';
        case 'auth/popup-blocked':
             return 'The sign-in pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
        case 'auth/cancelled-popup-request':
        case 'auth/popup-closed-by-user':
             return ''; // User cancelled, so no error message is needed.
        case 'firestore/permission-denied':
        case 'permission-denied':
             return "Failed to save your profile due to a permissions issue. Please ensure your Firestore security rules allow writes to the 'users' collection for authenticated users.";
        default:
            console.error("Unhandled auth error:", error);
            return 'An unexpected error occurred. Please check the console for details and try again.';
    }
}

async function manageUserProfile(user: User, additionalData: { displayName?: string | null } = {}): Promise<void> {
    const userRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        const displayName = additionalData.displayName || user.displayName;
        const newUserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: displayName,
            photoURL: user.photoURL,
            role: 'USER' as const,
            createdAt: serverTimestamp(),
        };

        const eventRef = doc(collection(firestore, 'events'));
        const newEvent = {
            type: 'USER_SIGNED_UP',
            userId: user.uid,
            entityId: user.uid,
            entityType: 'user',
            timestamp: serverTimestamp(),
            details: {
                displayName: displayName,
                email: user.email,
            }
        };

        try {
            const batch = writeBatch(firestore);
            batch.set(userRef, newUserProfile);
            batch.set(eventRef, newEvent);
            await batch.commit();

        } catch (dbError: any) {
            console.error("Firestore Error creating user profile:", dbError);
            const authError = new Error(
                `Failed to save user profile. This is often a database permissions issue. ` +
                `Please check your Firestore rules. Original error: (${dbError.code}) ${dbError.message}`
            );
            // Re-throwing with a property that my handler can recognize
            (authError as any).code = dbError.code || 'firestore/permission-denied';
            throw authError;
        }
    }
}

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Force token refresh to ensure Firestore rules are met.
    await getIdToken(user, true); 
    await manageUserProfile(user);
    return user;
  } catch (error: any) {
    // If sign-in was initiated but failed during profile creation, sign the user out
    // to ensure a clean state for the next attempt.
    if (error.code !== 'auth/popup-closed-by-user' && auth.currentUser) {
        await firebaseSignOut(auth);
    }
    throw error;
  }
}

export async function signUpWithEmailAndPassword(name: string, email: string, password: string): Promise<User> {
    let user: User | null = null;
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
        
        await updateProfile(user, { displayName: name });
        // Force token refresh before creating the profile
        await getIdToken(user, true); 
        await manageUserProfile(user, { displayName: name });

        return user;
    } catch (error: any) {
        // If the user was partially created, sign them out for a clean slate.
        if (user || auth.currentUser) {
           await firebaseSignOut(auth);
        }
        throw error;
    }
}

export async function signInUserWithEmailAndPassword(email: string, password:string): Promise<User> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch(error) {
        throw error;
    }
}


export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
