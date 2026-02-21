import { useState, useEffect, useRef } from 'react';
import { onSnapshot, type DocumentReference, type DocumentData } from 'firebase/firestore';

export function useDoc<T extends DocumentData>(docRef: DocumentReference<T> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dataRef = useRef<string | null>(null);

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(docRef, 
      (snapshot) => {
        const newData = snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } as T : null;
        const stringifiedData = JSON.stringify(newData);

        // By comparing stringified data, we prevent re-renders if the underlying data hasn't changed.
        // This breaks potential infinite loops in components that depend on this hook.
        if (stringifiedData !== dataRef.current) {
          dataRef.current = stringifiedData;
          setData(newData);
        }
        
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore Error:", err);
        const errorMessage = `Error fetching document. Check Firestore security rules for path: ${docRef.path}`;
        const permissionError = new Error(errorMessage);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, loading, error };
}
