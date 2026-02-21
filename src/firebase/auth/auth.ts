'use client';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';


const { auth, firestore } = initializeFirebase();
const provider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User | null> {
  let user: User | null = null;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;

    const userRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newUserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'USER',
        createdAt: serverTimestamp(),
      };
      // Await setDoc directly inside the try block. 
      // If it fails, the outer catch block will handle it.
      await setDoc(userRef, newUserProfile);
    }

    return user;

  } catch (error: any) {
    // If it's a permission error during doc creation, emit a contextual error.
    if (error.code === 'permission-denied' && user) {
        const userRef = doc(firestore, 'users', user.uid);
        const newUserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'USER',
            createdAt: 'SERVER_TIMESTAMP_PLACEHOLDER'
        };
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'create',
            requestResourceData: newUserProfile,
        });
        errorEmitter.emit('permission-error', permissionError);
    } 
    // Log other errors, but not when user closes popup
    else if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Error signing in with Google:', error);
    }
    
    // If there was any error, ensure user is signed out locally and return null
    if (auth.currentUser) {
        await firebaseSignOut(auth);
    }
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
