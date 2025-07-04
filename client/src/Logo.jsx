// Logo.jsx
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.svg
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
      viewBox="0 0 64 64"
      className="w-12 h-12 text-white"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow */}
      <circle cx="32" cy="32" r="30" stroke="url(#glow)" strokeWidth="4" fill="none" />

      {/* Bar Chart */}
      <g>
        <rect x="18" y="28" width="6" height="18" rx="1" fill="url(#bar1)" />
        <rect x="28" y="20" width="6" height="26" rx="1" fill="url(#bar2)" />
        <rect x="38" y="12" width="6" height="34" rx="1" fill="url(#bar3)" />
      </g>

      {/* Sparkle Icon */}
      <motion.circle
        cx="48"
        cy="8"
        r="3"
        fill="url(#sparkle)"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      <defs>
        <linearGradient id="bar1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff80b5" />
          <stop offset="100%" stopColor="#9089fc" />
        </linearGradient>
        <linearGradient id="bar2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="bar3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sparkle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
