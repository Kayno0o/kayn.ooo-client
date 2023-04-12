/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    function ({ addVariant }) {
      addVariant('all-child', '& *');
    },
  ],
  theme: {
    extend: {
      colors: {
        black: '#363636',
        white: '#eaeaea',
      },
    },
  },
};
