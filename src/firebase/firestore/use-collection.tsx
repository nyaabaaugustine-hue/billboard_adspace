import { useState, useEffect, useRef } from 'react';
import { onSnapshot, type Query, type DocumentData } from 'firebase/firestore';

export function useCollection<T extends DocumentData>(query: Query<T> | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dataRef = useRef<string | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(query, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T));
        const stringifiedData = JSON.stringify(docs);

        // By comparing stringified data, we prevent re-renders if the underlying data hasn't changed.
        // This breaks potential infinite loops in components that depend on this hook.
        if (stringifiedData !== dataRef.current) {
          dataRef.current = stringifiedData;
          setData(docs);
        }

        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore Error:", err);
        const errorMessage = `Error fetching collection. Check Firestore security rules for path: ${(query as any)._query.path.segments.join('/')}`;
        const permissionError = new Error(errorMessage);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
