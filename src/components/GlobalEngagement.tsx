'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SocialProofNotification = dynamic(() =>
    import('./social-proof-notification').then((mod) => mod.SocialProofNotification), { ssr: false });

const AdSlider = dynamic(() =>
    import('./shared/ad-slider').then((mod) => mod.AdSlider), { ssr: false });


const excludedPaths = ['/dashboard', '/login', '/signup'];

export function GlobalEngagement() {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isDisabled = excludedPaths.some(path => pathname.startsWith(path));

    if (isDisabled || !isClient) {
        return null;
    }

    return (
        <>
            <SocialProofNotification />
            <AdSlider />
        </>
    );
}
