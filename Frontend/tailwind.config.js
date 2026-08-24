/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes:{
        slideInFromLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUpSlow: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation:{
        slideInFromLeft: 'slideInFromLeft 1s ease-in-out forwards',
        fadeUpSlow: 'fadeUpSlow 1s ease-out forwards'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

