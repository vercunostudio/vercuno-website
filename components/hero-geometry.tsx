export function OrbitalLines() {
  return (
    <svg
      aria-hidden="true"
      className="hero__orbits"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <g className="hero__orbit-group" data-motion="orbit">
        <circle
          cx="1218"
          cy="610"
          pathLength="1"
          r="470"
          stroke="#0297DE"
          strokeOpacity="0.42"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}

export function MonumentalV() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="hero__v hero__v--desktop"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient
            id="v-desktop-fill"
            x1="0.06"
            x2="0.98"
            y1="0.02"
            y2="0.74"
          >
            <stop offset="0" stopColor="#0EA9EC" />
            <stop offset="0.38" stopColor="#0297DE" />
            <stop offset="0.72" stopColor="#0183C6" />
            <stop offset="1" stopColor="#016699" />
          </linearGradient>
          <linearGradient
            id="v-desktop-scrim"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#02070A" stopOpacity="0" />
            <stop offset="0.5" stopColor="#02070A" stopOpacity="0.1" />
            <stop offset="0.72" stopColor="#02070A" stopOpacity="0.42" />
            <stop offset="0.9" stopColor="#02070A" stopOpacity="0.78" />
            <stop offset="1" stopColor="#02070A" stopOpacity="0.86" />
          </linearGradient>
        </defs>
        <path
          d="M935 100H1170L1382 555L1490 300V1000H1290Z"
          fill="url(#v-desktop-fill)"
          stroke="#5BC7F3"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />
        <path
          d="M935 100H1170L1382 555L1490 300V1000H1290Z"
          fill="url(#v-desktop-scrim)"
        />
      </svg>

      <svg
        aria-hidden="true"
        className="hero__v hero__v--mobile"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 390 844"
      >
        <defs>
          <linearGradient
            id="v-mobile-fill"
            x1="0.92"
            x2="0.1"
            y1="0.02"
            y2="1"
          >
            <stop offset="0" stopColor="#0BA8EC" />
            <stop offset="0.16" stopColor="#0297DE" />
            <stop offset="0.28" stopColor="#066F99" />
            <stop offset="0.4" stopColor="#044459" />
            <stop offset="0.58" stopColor="#032E3F" />
            <stop offset="0.78" stopColor="#022430" />
            <stop offset="1" stopColor="#021A25" />
          </linearGradient>
          <linearGradient
            id="v-mobile-scrim"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#02070A" stopOpacity="0" />
            <stop offset="0.2" stopColor="#02070A" stopOpacity="0.08" />
            <stop offset="0.38" stopColor="#02070A" stopOpacity="0.55" />
            <stop offset="0.58" stopColor="#02070A" stopOpacity="0.62" />
            <stop offset="0.8" stopColor="#02070A" stopOpacity="0.4" />
            <stop offset="1" stopColor="#02070A" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M390 150C378 282 348 402 298 520C250 634 194 716 188 780C184 824 246 848 330 858L396 858L396 150Z"
          fill="url(#v-mobile-fill)"
        />
        <path
          d="M390 150C378 282 348 402 298 520C250 634 194 716 188 780C184 824 246 848 330 858L396 858L396 150Z"
          fill="url(#v-mobile-scrim)"
        />
      </svg>
    </>
  );
}
