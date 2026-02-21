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
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

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

      try {
        await setDoc(userRef, newUserProfile);
      } catch (dbError: any) {
        // If creating the user profile fails, we must sign the user out
        // to prevent an inconsistent state.
        console.error("Failed to create user profile, signing out.", dbError);
        await firebaseSignOut(auth);

        if (dbError.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'create',
                requestResourceData: newUserProfile,
            });
            errorEmitter.emit('permission-error', permissionError);
        }
        return null;
      }
    }

    return user;

  } catch (error: any) {
    if (error.code === 'auth/invalid-api-key') {
        console.error(
          'Firebase authentication failed: Invalid API Key. Please verify your Firebase project configuration in src/firebase/config.ts.'
        );
   } else if (error.code !== 'auth/popup-closed-by-user') {
       console.error('Error signing in with Google:', error);
   }

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
