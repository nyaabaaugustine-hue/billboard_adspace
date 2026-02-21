'use client';

import { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const [isRendered, setIsRendered] = useState(false);
  const [currentNotification, setCurrentNotification] = useState('');
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('socialProofStopped') === 'true') {
      setIsStopped(true);
    }
  }, []);

  useEffect(() => {
    if (isStopped) {
      return;
    }

    const initialTimeout = setTimeout(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);
    }, 5000);

    const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            setCurrentNotification(randomNotification);
            setIsVisible(true);
        }, 1000);
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isStopped]);
  
  useEffect(() => {
      if (isVisible) {
        setIsRendered(true);
        const visibilityTimer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);
        return () => clearTimeout(visibilityTimer);
      } else {
        const unmountTimer = setTimeout(() => setIsRendered(false), 500); // Match transition duration
        return () => clearTimeout(unmountTimer);
      }
  }, [isVisible]);

  const handleStop = () => {
    setIsVisible(false);
    setIsStopped(true);
    sessionStorage.setItem('socialProofStopped', 'true');
  };

  if (isStopped || !isRendered) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 w-auto sm:right-auto sm:w-full sm:max-w-xs transition-all duration-500 ease-in-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[calc(100%+2rem)]'
      )}
    >
      <div className="relative overflow-hidden rounded-xl bg-card/60 p-4 shadow-2xl backdrop-blur-xl border border-border/20">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary/80 to-primary/40" />
        <div className="flex items-start gap-4 pl-4">
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Zap className="h-5 w-5 text-primary" />
                </div>
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-sm text-foreground">Live Platform Activity</p>
                <p className="text-muted-foreground text-sm">{currentNotification}</p>
                <div className="mt-2">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground/80 hover:text-muted-foreground" onClick={handleStop}>
                    Stop seeing these
                </Button>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 shrink-0" onClick={() => setIsVisible(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
            </Button>
        </div>
      </div>
    </div>
  );
}
