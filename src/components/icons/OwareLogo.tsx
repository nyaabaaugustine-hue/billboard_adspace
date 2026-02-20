import type { SVGProps } from "react";

export function OwareLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="6" cy="12" r="3" fill="hsl(var(--primary))" />
        <circle cx="12" cy="12" r="3" fill="hsl(var(--accent))" />
        <circle cx="18" cy="12" r="3" fill="hsl(var(--primary))" />
      </svg>
      <span className="self-center whitespace-nowrap font-headline text-2xl font-semibold">
        Oware<span className="text-primary">Ads</span>
      </span>
    </div>
  );
}
