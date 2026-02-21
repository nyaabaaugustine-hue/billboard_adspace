'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error("Firebase Permission Error:", error);

      if (error instanceof FirestorePermissionError) {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: "You don't have permission to perform this action. Check the console for details.",
        });
        
        if (process.env.NODE_ENV === 'development') {
           throw error;
        }

      } else {
         toast({
            variant: 'destructive',
            title: 'An Error Occurred',
            description: 'Something went wrong. Please try again later.',
          });
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
