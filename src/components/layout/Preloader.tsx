'use client';

import { OwareLogo } from '../icons/OwareLogo';
import { motion } from 'framer-motion';

export function Preloader() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      <OwareLogo width={128} height={32} />
    </motion.div>
  );
}
