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
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';


const provider = new GoogleAuthProvider();

export function getFirebaseAuthErrorMessage(error: any): string {
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
        default:
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
             console.error("Failed to create user profile in Firestore.", dbError);
             const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'create',
                requestResourceData: newUserProfile,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw dbError;
        }
    }
}


export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Force token refresh to ensure it's available for Firestore rules
    await getIdToken(user, true);
    await manageUserProfile(user);
    return user;
  } catch (error: any) {
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
        // Force token refresh to ensure it's available for Firestore rules
        await getIdToken(user, true);
        await updateProfile(user, { displayName: name });
        await manageUserProfile(user, { displayName: name });
        return user;
    } catch (error) {
        if (user) {
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
