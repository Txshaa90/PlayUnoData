/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16A34A',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        accent: {
          DEFAULT: '#D1FAE5',
          light: '#ECFDF5',
        },
        background: {
          DEFAULT: '#F9FAFB',
          white: '#FFFFFF',
        },
        status: {
          approved: '#16A34A',
          'approved-bg': '#D1FAE5',
          pending: '#FACC15',
          'pending-bg': '#FEF3C7',
          progress: '#3B82F6',
          'progress-bg': '#DBEAFE',
          rejected: '#EF4444',
          'rejected-bg': '#FEE2E2',
        }
      },
      borderRadius: {
        'component': '12px',
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
