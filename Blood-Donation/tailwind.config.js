// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        'sm': '100%',
        'md': '720px',
        'lg': '960px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      maxWidth: {
        'md': '768px',
        '2xl': '1440px',
      },
      backgroundImage: {
        'hero-pattern': "url('/Images/Background.png')",
        'custom-gradient': 'linear-gradient(to right, #46052D 0%, #46052D 16.67%, #500732 33.34%, #5E0933 50%, #610834 66.67%, #6A0B37 83.34%, #991747 100%, #B32346 100%)',
        'find-gradient': 'linear-gradient(to right, #550832 0%, #B32346 14.29%, #5E0933 28.57%, #991747 42.86%, #B32346 57.14%, #500732 71.43%, #A8174E 85.71%, #550832 100%)',

      },
      flexBasis: {
        '1/10': '10%',   // Custom class for 10%
        '9/20': '45%',   // Custom class for 45%
      },
      backgroundSize: {
        'cover': 'cover',
      },
      fontSize: {
        'small-text': '1.25rem', // Equivalent to 20px
        'reg-text': '2.25rem',   // Equivalent to 36px
      },
      lineHeight: {
        'small-text': '2.625rem', // Same for both small-text and reg-text
        'reg-text': '2.625rem',   // Line height for reg-text
      },
    },
  },
}
