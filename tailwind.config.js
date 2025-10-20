import PrimeUI from 'tailwindcss-primeui';
module.exports = {
  darkMode: ['class', '[class~="app-dark"]'],
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
};
