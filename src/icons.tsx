// Small inline icons; they take the current text colour and size with the font
type P = { size?: number }

const svg = (size: number, children: React.ReactNode, fill = false) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill ? 'currentColor' : 'none'}
    stroke={fill ? 'none' : 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
)

export const Play = ({ size = 16 }: P) => svg(size, <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.4-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />, true)

export const External = ({ size = 16 }: P) => svg(size, <path d="M7 17 17 7M8 7h9v9" />)

export const ArrowRight = ({ size = 16 }: P) => svg(size, <path d="M5 12h14M13 6l6 6-6 6" />)

export const ArrowUp = ({ size = 16 }: P) => svg(size, <path d="M12 19V5M6 11l6-6 6 6" />)

export const Mail = ({ size = 16 }: P) =>
  svg(
    size,
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>,
  )

export const GitHub = ({ size = 16 }: P) =>
  svg(
    size,
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />,
    true,
  )

export const Expand = ({ size = 16 }: P) => svg(size, <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />)

export const Close = ({ size = 16 }: P) => svg(size, <path d="M6 6l12 12M18 6 6 18" />)

export const Menu = ({ size = 16 }: P) => svg(size, <path d="M4 7h16M4 12h16M4 17h16" />)

export const Pin = ({ size = 16 }: P) =>
  svg(
    size,
    <>
      <path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>,
  )

export const Gamepad = ({ size = 16 }: P) =>
  svg(
    size,
    <>
      <path d="M6 11h4M8 9v4M15 12h.01M18 10h.01" />
      <path d="M17.3 5H6.7a4 4 0 0 0-3.96 3.43l-.7 4.95A2.7 2.7 0 0 0 6.6 15.5L8 14h8l1.4 1.5a2.7 2.7 0 0 0 4.56-2.12l-.7-4.95A4 4 0 0 0 17.3 5Z" />
    </>,
  )
