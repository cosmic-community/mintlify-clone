/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#0f1117',
          hover: '#1a1d2e',
          active: '#252940',
          border: '#2a2d3e',
          text: '#9ca3af',
          'text-active': '#ffffff',
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
          subtle: 'rgba(99, 102, 241, 0.1)',
        },
        content: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
          border: '#e2e8f0',
        },
        badge: {
          blue: '#dbeafe',
          'blue-text': '#1e40af',
          green: '#dcfce7',
          'green-text': '#166534',
          yellow: '#fef9c3',
          'yellow-text': '#854d0e',
          purple: '#f3e8ff',
          'purple-text': '#6b21a8',
          red: '#fee2e2',
          'red-text': '#991b1b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        'content': '48rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}