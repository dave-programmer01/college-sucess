type MediaPlaceholderProps = {
  className?: string;
  /** Leave the building out when something is shown on top, such as a label. */
  building?: boolean;
};

/**
 * Placeholder picture of a campus building on a hill, used wherever a real
 * photo or video still is missing. Fills its box and crops like a photo.
 */
export function MediaPlaceholder({ className, building = true }: MediaPlaceholderProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <rect width="320" height="180" className="fill-[#e3f2ee] dark:fill-[#16283a]" />
      <g className="fill-white dark:fill-[#1f354c]">
        <ellipse cx="62" cy="38" rx="26" ry="8" />
        <ellipse cx="80" cy="31" rx="16" ry="7" />
        <ellipse cx="250" cy="28" rx="22" ry="7" />
      </g>
      <path
        d="M0 128 C60 100 130 104 190 122 C240 136 290 112 320 118 V180 H0 Z"
        className="fill-[#c4e4db] dark:fill-[#18383f]"
      />
      <g className={building ? undefined : "hidden"}>
        <rect x="118" y="84" width="84" height="46" className="fill-[#f6f1e6] dark:fill-[#c9d3d6]" />
        <rect x="148" y="52" width="24" height="78" className="fill-[#f6f1e6] dark:fill-[#c9d3d6]" />
        <path d="M144 52 L160 28 L176 52 Z" className="fill-primary" />
        <path d="M112 84 H208 L200 74 H120 Z" className="fill-primary" />
        <g className="fill-[#9fb8b3] dark:fill-[#5d7a80]">
          <rect x="128" y="96" width="9" height="13" />
          <rect x="183" y="96" width="9" height="13" />
          <rect x="155.5" y="62" width="9" height="13" />
          <rect x="153" y="106" width="14" height="24" />
        </g>
      </g>
      <path
        d="M0 142 C70 124 150 128 220 146 C262 157 296 150 320 144 V180 H0 Z"
        className="fill-[#9fd3c5] dark:fill-[#1d5250]"
      />
      <g className="fill-[#5fae9a] dark:fill-[#2a7a70]">
        <path d="M40 140 L52 110 L64 140 Z" />
        <path d="M262 142 L273 114 L284 142 Z" />
        <circle cx="92" cy="122" r="10" />
      </g>
    </svg>
  );
}
