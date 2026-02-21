'use client';
import { app, auth, firestore } from './firebase';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebase = { firebaseApp: app, auth, firestore };
  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
