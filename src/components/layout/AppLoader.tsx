'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Preloader } from './Preloader';

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Use requestAnimationFrame to ensure the event listener is added after the initial render
    requestAnimationFrame(() => {
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }
    });

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
