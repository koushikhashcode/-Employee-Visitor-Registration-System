import React from 'react';

export const ReceptionHeroIllustration = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 540 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`reception-hero-svg ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id="hand-drawn-pen-wobble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Perspective floor & wall lines */}
      <g filter="url(#hand-drawn-pen-wobble)">
        <line x1="0" y1="230" x2="540" y2="230" stroke="#111111" strokeWidth="1.6" />
        <line x1="90" y1="280" x2="190" y2="230" stroke="#111111" strokeWidth="1.8" />
        <line x1="160" y1="280" x2="250" y2="230" stroke="#111111" strokeWidth="1.4" strokeDasharray="6 4" opacity="0.4" />
        <line x1="280" y1="280" x2="350" y2="230" stroke="#111111" strokeWidth="1.4" opacity="0.5" />
        <line x1="190" y1="0" x2="190" y2="230" stroke="#111111" strokeWidth="1.6" opacity="0.7" />
        <line x1="330" y1="0" x2="330" y2="230" stroke="#111111" strokeWidth="2.2" />
        <line x1="470" y1="0" x2="470" y2="230" stroke="#111111" strokeWidth="1.6" opacity="0.7" />
        <line x1="190" y1="46" x2="540" y2="46" stroke="#111111" strokeWidth="1.4" opacity="0.3" />

        {/* Clock on Wall */}
        <g transform="translate(488, 102)">
          <circle cx="0" cy="0" r="19" fill="#F8F5EC" stroke="#111111" strokeWidth="2.2" />
          <line x1="0" y1="-15" x2="0" y2="-12" stroke="#111111" strokeWidth="1.4" />
          <line x1="15" y1="0" x2="12" y2="0" stroke="#111111" strokeWidth="1.4" />
          <line x1="0" y1="15" x2="0" y2="12" stroke="#111111" strokeWidth="1.4" />
          <line x1="-15" y1="0" x2="-12" y2="0" stroke="#111111" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="-9" y2="-7" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="0" y1="0" x2="8" y2="-8" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="0" cy="0" r="2" fill="#111111" />
        </g>

        {/* Hanging Ceiling Lamp */}
        <g transform="translate(436, 0)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#111111" strokeWidth="2.2" />
          <rect x="-3" y="38" width="6" height="5" rx="1" fill="#111111" />
          <path d="M -22 62 C -22 42 22 42 22 62 Z" fill="#111111" stroke="#111111" strokeWidth="2.2" />
          <ellipse cx="0" cy="62" rx="22" ry="4" fill="#FFC907" />
          <line x1="0" y1="22" x2="0" y2="12" stroke="#FFC907" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-14" y1="28" x2="-22" y2="20" stroke="#FFC907" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="28" x2="22" y2="20" stroke="#FFC907" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Light cone from lamp */}
      <g transform="translate(436, 0)" opacity="0.16">
        <path d="M -16 64 L -52 210 L 52 210 L 16 64 Z" fill="#FFC907" />
      </g>

      {/* Dot Grids */}
      <g opacity="0.25">
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 4 }).map((__, c) => (
            <circle key={`tr-${r}-${c}`} cx={485 + c * 11} cy={22 + r * 11} r={1.3} fill="#111111" />
          ))
        )}
      </g>

      {/* Yellow Sparkles */}
      <path d="M 182 120 L 188 126" stroke="#FFC907" strokeWidth="2" strokeLinecap="round" />
      <path d="M 188 132 L 194 138" stroke="#FFC907" strokeWidth="2" strokeLinecap="round" />

      {/* "Better Access Control" annotation */}
      <g transform="translate(192, 64)">
        <g transform="rotate(-12 20 20)">
          <text x="0" y="0" fontFamily="'Caveat', cursive, sans-serif" fontSize="22" fontWeight="700" fill="#111111" letterSpacing="-0.02em">Better</text>
          <text x="8" y="20" fontFamily="'Caveat', cursive, sans-serif" fontSize="22" fontWeight="700" fill="#111111" letterSpacing="-0.02em">Access</text>
          <text x="14" y="40" fontFamily="'Caveat', cursive, sans-serif" fontSize="22" fontWeight="700" fill="#111111" letterSpacing="-0.02em">Control</text>
        </g>
        <path d="M 30 52 Q 40 80 48 100" stroke="#111111" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 42 94 L 48 100 L 49 92" stroke="#111111" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Furniture & Objects */}
      <g filter="url(#hand-drawn-pen-wobble)">
        {/* Side Table with Plant & Tablet */}
        <g transform="translate(242, 180)">
          <rect x="4" y="6" width="68" height="54" rx="3" fill="#111111" stroke="#111111" strokeWidth="2.2" />
          <rect x="0" y="0" width="76" height="8" rx="2" fill="#F8F5EC" stroke="#111111" strokeWidth="1.8" />
          <line x1="20" y1="28" x2="60" y2="28" stroke="#FFC907" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Tablet on stand */}
          <g transform="translate(18, -24) rotate(8)">
            <rect x="0" y="0" width="16" height="23" rx="3" fill="#111111" stroke="#111111" strokeWidth="1.5" />
            <rect x="2" y="2" width="12" height="17" rx="1.5" fill="#FFFFFF" />
            <circle cx="8" cy="20.5" r="1" fill="#FAF8F2" />
          </g>

          {/* Plant in pot */}
          <g transform="translate(38, -26)">
            <path d="M 5 26 L 8 4 L 26 4 L 29 26 Z" fill="#111111" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 17 4 C 15 -14 9 -28 1 -40 C 9 -24 16 -8 17 4 Z" fill="#111111" stroke="#111111" strokeWidth="1.5" />
            <path d="M 17 4 C 18 -18 17 -34 16 -48 C 20 -30 21 -10 17 4 Z" fill="#111111" stroke="#111111" strokeWidth="1.5" />
            <path d="M 17 4 C 22 -14 29 -26 38 -38 C 31 -22 23 -7 17 4 Z" fill="#111111" stroke="#111111" strokeWidth="1.5" />
            <path d="M 17 4 C 12 -8 3 -16 -5 -22 C 4 -11 12 -2 17 4 Z" fill="#111111" stroke="#111111" strokeWidth="1.5" />
            <path d="M 17 4 C 23 -8 32 -16 41 -20 C 32 -10 23 -1 17 4 Z" fill="#111111" stroke="#111111" strokeWidth="1.5" />
          </g>
        </g>

        {/* Main Reception Desk */}
        <g transform="translate(322, 148)">
          <path d="M 0 0 L 178 -6 L 186 6 L 0 10 Z" fill="#111111" stroke="#111111" strokeWidth="2.2" />
          
          {/* Yellow Left End Panel */}
          <rect x="0" y="4" width="18" height="88" rx="3" fill="#FFC907" stroke="#111111" strokeWidth="2.2" />
          
          {/* Main Front Panel */}
          <rect x="18" y="6" width="164" height="86" rx="4" fill="#F8F5EC" stroke="#111111" strokeWidth="2.2" />
          <rect x="24" y="18" width="58" height="70" rx="3" fill="#111111" />
          <path d="M 166 6 L 182 6 L 182 92 L 166 92 Z" fill="#111111" stroke="#111111" strokeWidth="1.5" />
          
          {/* "VISITORS" Yellow Badge on Front Desk */}
          <g transform="translate(56, 20)">
            <rect x="0" y="0" width="88" height="32" rx="4" fill="#FFC907" stroke="#111111" strokeWidth="2.2" />
            <text x="44" y="21" textAnchor="middle" fontFamily="'Anton', 'Bebas Neue', 'Barlow Condensed', sans-serif" fontSize="16" fontWeight="900" letterSpacing="0.08em" fill="#111111">VISITORS</text>
          </g>

          {/* Small desk accessories */}
          <rect x="34" y="-14" width="12" height="16" rx="2" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
          <line x1="37" y1="-7" x2="43" y2="-7" stroke="#111111" strokeWidth="1" />
          <line x1="37" y1="-4" x2="41" y2="-4" stroke="#111111" strokeWidth="1" />

          {/* Business cards holder */}
          <g transform="translate(50, -10)">
            <rect x="0" y="0" width="12" height="10" rx="2" fill="#111111" />
            <circle cx="6" cy="4" r="1.5" fill="#FFC907" />
          </g>

          {/* Computer Monitor on Desk */}
          <g transform="translate(114, -38)">
            <rect x="22" y="24" width="4" height="18" fill="#111111" />
            <rect x="14" y="40" width="20" height="4" rx="1" fill="#111111" />
            <rect x="-4" y="0" width="56" height="28" rx="3" fill="#111111" stroke="#111111" strokeWidth="2" />
            <rect x="0" y="3" width="48" height="22" rx="1" fill="#111111" />
            <rect x="8" y="8" width="32" height="11" rx="2" fill="#FFC907" />
            <text x="24" y="16.5" textAnchor="middle" fill="#111111" fontFamily="'Anton', sans-serif" fontSize="7.5" fontWeight="bold" letterSpacing="0.05em">VISITORS</text>
          </g>
        </g>
      </g>
    </svg>
  );
};
