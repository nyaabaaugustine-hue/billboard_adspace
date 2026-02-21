import Image from 'next/image';

export function AdspaceLogo({ width, height }: { width?: number; height?: number }) {
  return (
    <Image
      src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771617987/cv_euqiu3.png"
      alt="Adspace Logo"
      width={width || 64}
      height={height || 16}
      priority
    />
  );
}
