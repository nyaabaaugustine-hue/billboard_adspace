'use client';

import { usePathname } from 'next/navigation';
import { SocialProofNotification } from './social-proof-notification';
import { AdSlider } from './shared/ad-slider';
import { useEffect, useState } from 'react';

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
