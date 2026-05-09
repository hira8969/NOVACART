/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#07111f',
        cloud: '#f7f8fc',
        neon: '#22d3ee',
        punch: '#ec4899'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(34, 211, 238, 0.22)',
        premium: '0 24px 80px rgba(15, 23, 42, 0.16)'
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    }
  },
  plugins: []
};
