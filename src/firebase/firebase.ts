import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// During a production build, Next.js will prerender pages on the server.
// If the environment variable for the API key is not set in the build environment,
// the app will fail to initialize, causing the build to crash.
// This check makes the error explicit and tells the developer exactly what to do.
if (process.env.NODE_ENV === 'production' && !firebaseConfig.apiKey) {
    throw new Error(
        'FIREBASE_API_KEY_MISSING: The `NEXT_PUBLIC_FIREBASE_API_KEY` environment variable is not defined in the build environment. ' +
        'Please set this variable in your deployment service settings to allow the application to connect to Firebase.'
    );
}


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
