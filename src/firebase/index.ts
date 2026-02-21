'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { useFirebase as useFirebaseCore, FirebaseProvider } from './provider';
import { useUser } from './auth/use-user';
import { useDoc } from './firestore/use-doc';
import { useCollection } from './firestore/use-collection';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebase() {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  }
  return { firebaseApp, auth, firestore };
}

function useFirebase() {
  return useFirebaseCore();
}
const useFirebaseApp = () => useFirebase().firebaseApp;
const useAuth = () => useFirebase().auth;
const useFirestore = () => useFirebase().firestore;


export {
  initializeFirebase,
  FirebaseProvider,
  useFirebase,
  useFirebaseApp,
  useAuth,
  useFirestore,
  useUser,
  useDoc,
  useCollection,
};
