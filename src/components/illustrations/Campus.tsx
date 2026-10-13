/**
 * Placeholder artwork for the final screen: the campus building between
 * trees, with confetti in the air. Swap for real artwork when it exists.
 */
export function Campus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 190" aria-hidden="true" className={className}>
      {/* Confetti */}
      <g>
        <g className="fill-primary-light">
          <rect x="38" y="30" width="9" height="4" rx="1" transform="rotate(-28 42 32)" />
          <rect x="262" y="22" width="9" height="4" rx="1" transform="rotate(34 266 24)" />
          <rect x="112" y="14" width="8" height="4" rx="1" transform="rotate(18 116 16)" />
          <circle cx="288" cy="72" r="3" />
          <circle cx="62" cy="88" r="2.5" />
        </g>
        <g className="fill-star">
          <rect x="72" y="50" width="9" height="4" rx="1" transform="rotate(40 76 52)" />
          <rect x="226" y="46" width="9" height="4" rx="1" transform="rotate(-36 230 48)" />
          <circle cx="200" cy="18" r="3" />
          <circle cx="24" cy="62" r="2.5" />
          <rect x="296" y="40" width="8" height="4" rx="1" transform="rotate(12 300 42)" />
        </g>
        <g className="fill-flame">
          <rect x="148" y="8" width="8" height="4" rx="1" transform="rotate(-18 152 10)" />
          <circle cx="246" cy="84" r="2.5" />
          <rect x="16" y="98" width="8" height="4" rx="1" transform="rotate(30 20 100)" />
          <circle cx="94" cy="30" r="2.5" />
        </g>
      </g>

      {/* Ground */}
      <ellipse cx="160" cy="168" rx="150" ry="20" className="fill-[#c4e4db] dark:fill-[#18383f]" />

      {/* Trees */}
      <g className="fill-[#5fae9a] dark:fill-[#2a7a70]">
        <circle cx="62" cy="126" r="20" />
        <circle cx="88" cy="140" r="14" />
        <circle cx="258" cy="126" r="20" />
        <circle cx="232" cy="140" r="14" />
        <path d="M24 164 L36 128 L48 164 Z" />
        <path d="M272 164 L284 128 L296 164 Z" />
      </g>
      <g className="fill-[#3f8f7c] dark:fill-[#1f5f58]">
        <rect x="60" y="144" width="4" height="20" />
        <rect x="86" y="152" width="4" height="12" />
        <rect x="256" y="144" width="4" height="20" />
        <rect x="230" y="152" width="4" height="12" />
      </g>

      {/* Building */}
      <g>
        <rect x="106" y="104" width="108" height="60" className="fill-[#f6f1e6] dark:fill-[#c9d3d6]" />
        <rect x="143" y="64" width="34" height="100" className="fill-[#f6f1e6] dark:fill-[#c9d3d6]" />
        <path d="M138 64 L160 34 L182 64 Z" className="fill-primary" />
        <path d="M98 104 H222 L212 92 H108 Z" className="fill-primary" />
        <rect x="158.5" y="22" width="3" height="14" className="fill-primary" />
        <path d="M161.5 22 H174 L170 26.5 L174 31 H161.5 Z" className="fill-primary-light" />
        <g className="fill-[#9fb8b3] dark:fill-[#5d7a80]">
          <rect x="118" y="118" width="11" height="16" />
          <rect x="191" y="118" width="11" height="16" />
          <rect x="118" y="142" width="11" height="14" />
          <rect x="191" y="142" width="11" height="14" />
          <rect x="154.5" y="76" width="11" height="16" />
          <path d="M151 164 V138 a9 9 0 0 1 18 0 V164 Z" />
        </g>
      </g>
    </svg>
  );
}
