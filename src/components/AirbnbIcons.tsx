import React from 'react';

export const BeloLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8 text-[#FF385C]' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.479.96 3.328l.011.315c0 4.545-3.328 7.874-7.874 7.874-2.522 0-4.706-1.071-6.195-2.83l-.431-.548-.431.548C13.078 30.929 10.894 32 8.372 32 3.826 32 .498 28.671.498 24.126c0-1.08.31-2.186.971-3.643l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.537 1.963 11.992 1 14 1h2zm0 2c-1.229 0-2.271.603-3.238 2.33l-.534 1.026C10.278 10.19 6.136 18.86 5.16 21.135l-.146.353C4.42 22.82 4.148 23.684 4.148 24.126c0 2.535 1.841 4.224 4.224 4.224 1.765 0 3.483-.93 4.606-2.45l.654-.897.654.897c1.123 1.52 2.841 2.45 4.606 2.45 2.383 0 4.224-1.689 4.224-4.224 0-.442-.272-1.306-.866-2.638l-.146-.353c-.976-2.275-5.118-10.945-7.068-14.779l-.534-1.026C18.271 3.603 17.229 3 16 3zm0 11a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

export const GuestFavoriteBadge: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-amber-500' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export const SuperhostMedal: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-[#FF385C]' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
