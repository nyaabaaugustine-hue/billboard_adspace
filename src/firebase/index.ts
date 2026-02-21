'use client';
import { useFirebase as useFirebaseCore } from './provider';

// Core provider and context hook
export { FirebaseProvider } from './provider';
export const useFirebase = useFirebaseCore;

// Hooks for accessing Firebase services
export const useAuth = () => useFirebaseCore().auth;
export const useFirestore = () => useFirebaseCore().firestore;
export const useFirebaseApp = () => useFirebaseCore().firebaseApp;

// Custom hooks for auth state and Firestore data
export { useUser } from './auth/use-user';
export { useDoc } from './firestore/use-doc';
export { useCollection } from './firestore/use-collection';
