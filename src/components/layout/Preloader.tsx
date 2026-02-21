'use client';

import { AdspaceLogo } from '../icons/OwareLogo';
import { motion } from 'framer-motion';

export function Preloader() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.2,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      <AdspaceLogo width={128} height={32} />
    </motion.div>
  );
}
