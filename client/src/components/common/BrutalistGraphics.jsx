import React from "react";

export const DotMatrix = ({ className = "", rows = 6, cols = 6 }) => {
  return (
    <div
      aria-hidden="true"
      className={`dot-matrix-grid cols-${cols} ${className}`}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="dot-matrix-dot" />
      ))}
    </div>
  );
};

export const GraphicAccentSquares = ({ className = "" }) => {
  return (
    <div aria-hidden="true" className={`graphic-accent-squares ${className}`}>
      <span className="accent-sq black" />
      <span className="accent-sq yellow" />
      <span className="accent-sq orange" />
    </div>
  );
};

export const HazardStripes = ({ className = "" }) => {
  return <div aria-hidden="true" className={`hazard-stripes ${className}`} />;
};

export const HazardStripeBar = ({ className = "" }) => {
  return <div aria-hidden="true" className={`hazard-stripes ${className}`} />;
};

export const CheckerStrip = ({ className = "" }) => {
  return <div aria-hidden="true" className={`checker-strip ${className}`} />;
};

export const FrontDeskIllustration = ({
  size = "md",
  framed = true,
  className = "",
}) => {
  const svgClass =
    size === "sm"
      ? "front-desk-sm"
      : size === "lg"
        ? "front-desk-lg"
        : "front-desk-md";
  const wrapperClass = framed ? "front-desk-framed" : "front-desk-unframed";

  const svgContent = (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`front-desk-svg ${svgClass}`}
      aria-label="Front Desk Reception and Visitor Pass Badge"
    >
      <rect
        x="5"
        y="5"
        width="210"
        height="170"
        rx="18"
        fill="#FAF8F2"
        stroke="#111111"
        strokeWidth="2.5"
      />
      <g opacity="0.35">
        <circle cx="24" cy="24" r="1.5" fill="#111111" />
        <circle cx="38" cy="24" r="1.5" fill="#111111" />
        <circle cx="52" cy="24" r="1.5" fill="#111111" />
        <circle cx="24" cy="38" r="1.5" fill="#111111" />
        <circle cx="38" cy="38" r="1.5" fill="#111111" />
        <circle cx="52" cy="38" r="1.5" fill="#111111" />
        <circle cx="168" cy="24" r="1.5" fill="#111111" />
        <circle cx="182" cy="24" r="1.5" fill="#111111" />
        <circle cx="196" cy="24" r="1.5" fill="#111111" />
        <circle cx="168" cy="38" r="1.5" fill="#111111" />
        <circle cx="182" cy="38" r="1.5" fill="#111111" />
        <circle cx="196" cy="38" r="1.5" fill="#111111" />
      </g>
      <path
        d="M12 152 L208 152"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="20"
        y="152"
        width="180"
        height="14"
        rx="5"
        fill="#FFC20E"
        stroke="#111111"
        strokeWidth="2.5"
      />
      <g transform="translate(18, 102)">
        <path
          d="M14 6 C10 1 5 -1 0 0"
          stroke="var(--yellow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42 6 C46 1 51 -1 56 0"
          stroke="var(--yellow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="26"
          y="12"
          width="4"
          height="6"
          rx="2"
          fill="var(--yellow)"
          stroke="#111111"
          strokeWidth="2"
        />
        <path
          d="M10 40 C10 22 20 18 28 18 C36 18 46 22 46 40 Z"
          fill="#FFC20E"
          stroke="#111111"
          strokeWidth="2.5"
        />
        <path
          d="M18 30 C20 24 24 22 29 22"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="8" y="40" width="40" height="5" rx="2" fill="#111111" />
        <path
          d="M5 49 L51 49 L47 45 L9 45 Z"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(132, 64)">
        <path d="M28 78 L38 88 L46 88 L36 78 Z" fill="#111111" />
        <rect
          x="4"
          y="8"
          width="68"
          height="76"
          rx="9"
          fill="#111111"
          stroke="#111111"
          strokeWidth="2.5"
        />
        <rect
          x="8"
          y="12"
          width="60"
          height="68"
          rx="6"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="1.5"
        />
        <rect x="12" y="16" width="52" height="11" rx="3" fill="#FAF8F2" />
        <circle cx="18" cy="21.5" r="2.5" fill="var(--yellow)" />
        <rect x="24" y="20" width="28" height="3.5" rx="1.5" fill="#111111" />
        <circle
          cx="38"
          cy="45"
          r="12"
          fill="#2E9E5B"
          stroke="#111111"
          strokeWidth="1.5"
        />
        <path
          d="M33 45 L37 49 L44 41"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="18" y="63" width="40" height="4" rx="2" fill="#111111" />
        <rect x="23" y="70" width="30" height="3" rx="1.5" fill="#6B6B66" />
        <circle cx="38" cy="10" r="1" fill="#FAF8F2" />
      </g>
      <g transform="translate(68, 12)">
        <path
          d="M40 -4 C38 12 39 19 39 26"
          stroke="var(--yellow)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M40 -4 C38 12 39 19 39 26"
          stroke="#111111"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <rect x="32" y="22" width="16" height="8" rx="3" fill="#111111" />
        <rect
          x="36"
          y="18"
          width="8"
          height="6"
          rx="2"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2"
        />
        <circle cx="40" cy="26" r="2" fill="#FFC20E" />
        <rect x="4" y="34" width="80" height="110" rx="10" fill="#111111" />
        <rect
          x="0"
          y="30"
          width="80"
          height="110"
          rx="10"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2.5"
        />
        <rect
          x="33"
          y="34"
          width="14"
          height="4"
          rx="2"
          fill="#FAF8F2"
          stroke="#111111"
          strokeWidth="1.5"
        />
        <rect
          x="0"
          y="42"
          width="80"
          height="21"
          fill="#FFC20E"
          stroke="#111111"
          strokeWidth="2"
        />
        <text
          x="40"
          y="56.5"
          textAnchor="middle"
          fill="#111111"
          fontFamily="'Anton', 'Barlow Condensed', sans-serif"
          fontSize="11"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          VISITOR PASS
        </text>
        <rect
          x="8"
          y="70"
          width="28"
          height="32"
          rx="4"
          fill="#FAF8F2"
          stroke="#111111"
          strokeWidth="2"
        />
        <circle cx="22" cy="80" r="5.5" fill="#111111" />
        <path
          d="M12 99 C12 90 17 88 22 88 C27 88 32 90 32 99 Z"
          fill="var(--yellow)"
          stroke="#111111"
          strokeWidth="1.5"
        />
        <rect x="41" y="73" width="31" height="4" rx="2" fill="#111111" />
        <rect x="41" y="80" width="24" height="3" rx="1.5" fill="#6B6B66" />
        <rect x="41" y="86" width="27" height="3" rx="1.5" fill="#6B6B66" />
        <rect
          x="41"
          y="93"
          width="20"
          height="6"
          rx="3"
          fill="#FFC20E"
          stroke="#111111"
          strokeWidth="1"
        />
        <line
          x1="8"
          y1="108"
          x2="72"
          y2="108"
          stroke="#111111"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <g transform="translate(8, 114)">
          <rect
            x="0"
            y="0"
            width="20"
            height="20"
            rx="3"
            fill="#FFFFFF"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <rect x="2.5" y="2.5" width="5.5" height="5.5" fill="#111111" />
          <rect x="12" y="2.5" width="5.5" height="5.5" fill="#111111" />
          <rect x="2.5" y="12" width="5.5" height="5.5" fill="#111111" />
          <rect x="10" y="10" width="3" height="3" fill="var(--yellow)" />
          <rect x="13" y="13" width="4" height="4" fill="#111111" />
        </g>
        <rect x="33" y="117" width="40" height="4" rx="2" fill="#111111" />
        <rect x="33" y="124" width="26" height="3" rx="1.5" fill="#2E9E5B" />
        <g transform="translate(64, 122)">
          <circle
            cx="8"
            cy="8"
            r="11"
            fill="#2E9E5B"
            stroke="#111111"
            strokeWidth="2"
          />
          <path
            d="M4 8 L7 11.5 L12.5 5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <path
        d="M122 18 L124 12 L126 18 L132 20 L126 22 L124 28 L122 22 L116 20 Z"
        fill="#FFC20E"
        stroke="#111111"
        strokeWidth="1"
      />
      <path
        d="M48 76 L49 72 L50 76 L54 77 L50 78 L49 82 L48 78 L44 77 Z"
        fill="var(--yellow)"
        stroke="#111111"
        strokeWidth="1"
      />
    </svg>
  );

  return <div className={`${wrapperClass} ${className}`}>{svgContent}</div>;
};
