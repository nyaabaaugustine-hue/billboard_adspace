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
} from 'firebase/firestore';
import { auth, firestore } from '../firebase';


const provider = new GoogleAuthProvider();

export function getFirebaseAuthErrorMessage(error: any): string {
    if (error.message.includes("failed to save your profile")) {
        return error.message;
    }
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'This email address is already in use by another account.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled.';
        case 'auth/weak-password':
            return 'The password is too weak.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/user-disabled':
            return 'Invalid email or password. Please try again.';
        case 'auth/too-many-requests':
            return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
        case 'auth/network-request-failed':
            return 'A network error occurred. Please check your internet connection and ensure your app\'s domain is authorized in your Firebase project settings.';
        case 'permission-denied':
             return "Failed to save your profile due to a permissions issue. Please contact support.";
        default:
            console.error("Unhandled auth error:", error);
            return 'An unexpected error occurred. Please try again.';
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
            role: 'USER', 
            createdAt: serverTimestamp(),
        };

        try {
            await setDoc(userRef, newUserProfile);
        } catch (dbError: any) {
             console.error("Firestore Error on profile creation:", dbError);
             throw new Error(`Your user account was created, but we failed to save your profile to the database. This is likely a Firestore permissions issue. Original error: ${dbError.message}`);
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
