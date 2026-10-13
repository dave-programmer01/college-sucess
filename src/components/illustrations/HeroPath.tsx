/**
 * Placeholder landing illustration: a path winding up green hills to a
 * Lehman flag. Swap for real artwork when it exists.
 */
export function HeroPath({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 440"
      role="img"
      aria-label="A path winding up green hills to a Lehman College flag"
      className={className}
    >
      <rect width="560" height="440" className="fill-[#eef8f5] dark:fill-[#122033]" />

      {/* Clouds */}
      <g className="fill-white dark:fill-[#1c2f45]">
        <ellipse cx="110" cy="92" rx="46" ry="15" />
        <ellipse cx="142" cy="80" rx="30" ry="13" />
        <ellipse cx="318" cy="62" rx="38" ry="12" />
      </g>

      {/* Hills, far to near */}
      <path
        d="M0 262 C120 200 240 214 330 246 C420 276 500 214 560 228 V440 H0 Z"
        className="fill-[#d3ece5] dark:fill-[#17343d]"
      />
      <path
        d="M96 440 C200 340 340 196 470 162 C510 152 540 158 560 166 V440 Z"
        className="fill-[#aedbcf] dark:fill-[#1a4649]"
      />
      <path
        d="M0 338 C110 296 220 326 320 384 C400 428 480 432 560 404 V440 H0 Z"
        className="fill-[#8bcab9] dark:fill-[#1f5a57]"
      />

      {/* Campus building */}
      <g>
        <rect x="372" y="150" width="62" height="34" className="fill-[#f6f1e6] dark:fill-[#c9d3d6]" />
        <rect x="394" y="122" width="18" height="62" className="fill-[#f6f1e6] dark:fill-[#c9d3d6]" />
        <path d="M391 122 L403 102 L415 122 Z" className="fill-primary" />
        <path d="M368 150 H438 L432 142 H374 Z" className="fill-primary" />
        <g className="fill-[#9fb8b3] dark:fill-[#5d7a80]">
          <rect x="379" y="158" width="7" height="10" />
          <rect x="420" y="158" width="7" height="10" />
          <rect x="399.5" y="132" width="7" height="10" />
          <rect x="398" y="166" width="10" height="18" />
        </g>
      </g>

      {/* The path */}
      <path
        d="M150 452 C150 392 334 404 322 350 C310 300 232 318 276 276 C316 238 398 252 424 208 C438 184 452 176 468 170"
        fill="none"
        strokeWidth="22"
        strokeLinecap="round"
        className="stroke-[#fbf7ec] dark:stroke-[#d7e2df]"
      />
      <g strokeWidth="3" className="fill-primary stroke-white dark:stroke-[#d7e2df]">
        <circle cx="240" cy="398" r="7" />
        <circle cx="322" cy="350" r="7" />
        <circle cx="276" cy="276" r="7" />
        <circle cx="424" cy="208" r="7" />
      </g>

      {/* Flag */}
      <path d="M470 172 V62" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-primary" />
      <path d="M472 64 H548 L537 86 L548 108 H472 Z" className="fill-primary" />
      <g className="fill-white" fontSize="11" fontWeight="700" letterSpacing="0.6">
        <text x="479" y="83">LEHMAN</text>
        <text x="479" y="98">COLLEGE</text>
      </g>

      {/* Trees */}
      <g>
        <g className="fill-[#5fae9a] dark:fill-[#2a7a70]">
          <path d="M66 330 L84 284 L102 330 Z" />
          <path d="M34 356 L50 316 L66 356 Z" />
          <path d="M494 352 L510 310 L526 352 Z" />
          <circle cx="182" cy="296" r="15" />
          <circle cx="520" cy="262" r="12" />
        </g>
        <g className="fill-[#3f8f7c] dark:fill-[#1f5f58]">
          <rect x="82" y="330" width="4" height="10" />
          <rect x="48" y="356" width="4" height="9" />
          <rect x="508" y="352" width="4" height="9" />
          <rect x="180" y="308" width="4" height="12" />
          <rect x="518" y="272" width="4" height="10" />
        </g>
      </g>
    </svg>
  );
}
