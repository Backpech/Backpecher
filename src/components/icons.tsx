import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      {...props}
    >
      <defs>
        <radialGradient id="dots-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"/>
        </radialGradient>
      </defs>
      
      <circle cx="90" cy="50" r="50" fill="url(#dots-gradient)" />

      <g transform="translate(10, 25)">
        <path d="M22.5 0 L28.5 18 L45 18 L32.5 28 L37.5 45 L22.5 35 L7.5 45 L12.5 28 L0 18 L16.5 18 Z" fill="hsl(var(--primary))" stroke="#282828" strokeWidth="2"/>
        <text x="50" y="32" fontFamily="Orbitron, sans-serif" fontSize="30" fill="#F9F5D7" stroke="#282828" strokeWidth="1.5" strokeLinejoin="round" textAnchor="start" dominantBaseline="middle" letterSpacing="1">
          BACKPECH
        </text>
      </g>
    </svg>
  ),
};
