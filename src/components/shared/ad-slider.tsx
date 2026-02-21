'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ads = [
  { text: 'Premium Printing Services by Accra Print Hub', link: '#' },
  { text: 'Verified Installation Team for the Tema region', link: '#' },
  { text: 'Digital Billboards featured on Airport Road', link: '#' },
  { text: 'Creative design services by Creative Spark', link: '#' },
];

export function AdSlider() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('adSliderDismissed') === 'true') {
      setIsDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (isDismissed) {
      return;
    }

    const adCycle = () => {
      // Slide in
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // 2 second wait before showing

      // Slide out
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 14000); // 2s wait + 12s visible

      // Go to next ad
      const nextTimer = setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 15000); // After slide out animation
      
      return { showTimer, hideTimer, nextTimer };
    };

    const timers = adCycle();

    return () => {
      clearTimeout(timers.showTimer);
      clearTimeout(timers.hideTimer);
      clearTimeout(timers.nextTimer);
    };
  }, [currentAdIndex, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('adSliderDismissed', 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed bottom-4 left-4 z-50 w-full max-w-sm"
        >
          <div className="rounded-xl bg-card p-4 shadow-2xl border flex gap-4 items-center">
             <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Megaphone className="h-5 w-5 text-secondary-foreground" />
            </div>
             <div className="flex-grow">
                 <Link href={ads[currentAdIndex].link} className="font-semibold text-sm hover:underline">
                    {ads[currentAdIndex].text}
                </Link>
                <p className="text-muted-foreground text-xs">Sponsored Promotion</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleDismiss}>
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
