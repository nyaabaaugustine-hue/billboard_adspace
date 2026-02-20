import Image from 'next/image';

export function OwareLogo({ width, height }: { width?: number; height?: number }) {
  return (
    <Image
      src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771613078/ChatGPT_Image_Feb_20_2026_06_35_49_PM_rneszg.png"
      alt="OwareAds Logo"
      width={width || 140}
      height={height || 35}
      priority
    />
  );
}
