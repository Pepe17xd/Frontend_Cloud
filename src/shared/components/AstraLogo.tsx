type AstraLogoProps = {
  className?: string;
};

export function AstraLogo({ className }: AstraLogoProps) {
  return (
    <svg className={className} viewBox="0 0 52 52" role="img" aria-label="ASTRA">
      <defs>
        <linearGradient id="astra-accretion" x1="5" y1="31" x2="47" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#314866" />
          <stop offset=".32" stopColor="#716A99" />
          <stop offset=".52" stopColor="#E6E7F0" />
          <stop offset=".7" stopColor="#625A88" />
          <stop offset="1" stopColor="#263750" />
        </linearGradient>
        <radialGradient id="astra-halo">
          <stop offset=".45" stopColor="#F0F1F7" stopOpacity=".7" />
          <stop offset="1" stopColor="#536782" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="27" r="17" fill="url(#astra-halo)" opacity=".42" />
      <ellipse cx="26" cy="27" rx="21" ry="7.8" fill="none" stroke="url(#astra-accretion)" strokeWidth="4" transform="rotate(-11 26 27)" />
      <path d="M8 29.8c7.2 7.4 28.3 8.8 38.2-1.8" fill="none" stroke="#A9AEC4" strokeWidth="1.2" strokeLinecap="round" opacity=".48" />
      <circle cx="26" cy="27" r="8.2" fill="#030407" stroke="#171A24" strokeWidth="1.2" />
      <path d="M17.8 27c.5-5.2 3.8-8.2 8.2-8.2 4.3 0 7.7 3 8.2 8.2" fill="none" stroke="#D7D8E3" strokeWidth="1" opacity=".55" />
      <ellipse cx="26" cy="27" rx="24" ry="12.5" fill="none" stroke="#5B6682" strokeWidth=".8" strokeDasharray="1.6 2.8" transform="rotate(29 26 27)" opacity=".6" />
      <path d="m42 6.2.95 2.65 2.65.95-2.65.96L42 13.4l-.96-2.64-2.64-.96 2.64-.95L42 6.2Z" fill="#F5F6FA" />
    </svg>
  );
}
