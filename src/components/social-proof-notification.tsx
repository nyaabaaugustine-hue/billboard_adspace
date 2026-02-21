'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const notifications = [
  'Kofi Mensah from Accra just booked a billboard.',
  'A new campaign was just launched in Kumasi.',
  'Spintex Road Digital Billboard was just reserved.',
  'Ama Boateng from Takoradi just started a campaign.',
  'Someone just booked the Accra Mall Unipole.',
  '3 people are looking at the Osu Oxford Street Digital billboard.',
];

export function SocialProofNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState('');
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    // Check sessionStorage on initial mount
    if (sessionStorage.getItem('socialProofStopped') === 'true') {
      setIsStopped(true);
    }
  }, []);

  useEffect(() => {
    if (isStopped) {
      return;
    }

    // Initial delay
    const initialTimeout = setTimeout(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);
    }, 5000);

    // Subsequent notifications
    const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            setCurrentNotification(randomNotification);
            setIsVisible(true);
        }, 1000); // Wait for slide out animation
    }, 50000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isStopped]);
  
  useEffect(() => {
      if (isVisible) {
          const visibilityTimer = setTimeout(() => {
              setIsVisible(false);
          }, 10000); // Auto-dismiss after 10 seconds
          return () => clearTimeout(visibilityTimer);
      }
  }, [isVisible]);

  const handleStop = () => {
    setIsVisible(false);
    setIsStopped(true);
    sessionStorage.setItem('socialProofStopped', 'true');
  };

  if (isStopped) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-sm"
        >
          <div className="rounded-xl bg-card p-4 shadow-2xl border flex gap-4 items-start">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-sm">Live Platform Activity</p>
                <p className="text-muted-foreground text-sm">{currentNotification}</p>
                 <div className="mt-2">
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={handleStop}>Stop seeing these</Button>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
