import { useId } from 'react';

interface IconProps {
  size?: number;
}

export function FacebookIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" aria-hidden>
      <path d="M241.87 0H14.13A14.13 14.13 0 0 0 0 14.13v227.74A14.13 14.13 0 0 0 14.13 256h122.62v-99H103.5v-38.75h33.25v-28.5c0-33.065 20.195-51.07 49.7-51.07 14.125 0 26.27 1.05 29.8 1.5v34.555H195.9c-16.05 0-19.16 7.625-19.16 18.82v24.695h38.37l-5 38.75h-33.37v99h65.12A14.13 14.13 0 0 0 256 241.87V14.13A14.13 14.13 0 0 0 241.87 0z" fill="#4267b2"/>
      <path d="M176.75 256v-99h33.375l5-38.75H176.75V93.57c0-11.195 3.1-18.82 19.16-18.82h20.34V40.185c-3.54-.47-15.685-1.5-29.8-1.5-29.5 0-49.7 18-49.7 51.07v28.5H103.5V157h33.25v99z" fill="#fff"/>
    </svg>
  );
}

export function TwitterIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 3H21l-6.52 7.452L22 21h-6.79l-5.32-6.957L3.74 21H1l6.97-7.97L1.5 3h6.95l4.81 6.36L18.244 3zm-2.38 16.2h1.86L7.27 4.7H5.27l10.594 14.5z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.34H5.67V9.67h2.67v7.67zM7 8.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 8.84h-2.67V13.5c0-.94-.36-1.46-1.13-1.46-.84 0-1.34.57-1.34 1.46v3.84H10.5V9.67h2.67v.95s.74-1.1 2.34-1.1c1.94 0 3.34 1.18 3.34 3.62v4.2z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fbfaf7" />
    </svg>
  );
}

/** Messenger brand icon from vectorlogo.zone */
export function MessengerIcon({ size = 16 }: IconProps) {
  const gradId = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="50.539" y1="-28.545" x2="50.539" y2="52.41">
          <stop offset="0" stopColor="#00c6ff"/>
          <stop offset="1" stopColor="#0068ff"/>
        </linearGradient>
      </defs>
      <path d="M21.99 40.19v16.226L37.16 47.79c4.23 1.22 8.725 1.877 13.383 1.877 24.97 0 45.208-18.886 45.208-42.18s-20.24-42.18-45.208-42.18S5.336-15.81 5.336 7.486c.001 13.19 6.49 24.97 16.653 32.703z" fill={`url(#${gradId})`} transform="matrix(.702455 0 0 .702455 -3.504901 24.370984)"/>
      <path d="M28.61 21.514L11.483 39.647l15.586-8.552 8.144 8.552 17.03-18.133-15.413 8.4-8.22-8.4z" fill="#fff"/>
    </svg>
  );
}

/** Viber brand tile icon from vectorlogo.zone */
export function ViberIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="#fff" aria-hidden>
      <rect width="512" height="512" rx="15%" fill="#665ca7"/>
      <path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="10" d="M269 186a30 30 0 0 1 31 31m-38-58a64 64 0 0 1 64 67m-73-93a97 97 0 0 1 99 104"/>
      <path fillRule="evenodd" d="M95 232c0-91 17-147 161-147s161 56 161 147-17 147-161 147l-26-1-53 63c-4 4-8 1-8-3v-69c-6 0-31-12-38-19-22-23-36-40-36-118zm-30 0c0-126 55-177 191-177s191 51 191 177-55 177-191 177c-10 0-18 0-32-2l-38 43c-7 8-28 11-28-13v-42c-6 0-20-6-39-18-19-13-54-44-54-145zm223 42q10-13 24-4l36 27q8 10-7 28t-28 15q-53-12-102-60t-61-104q0-20 25-34 13-9 22 5l25 35q6 12-7 22c-39 15 51 112 73 70z"/>
    </svg>
  );
}