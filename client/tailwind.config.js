module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        sm: '8px',
        md: '16px',
        lg: '25rem',
        xl: '35rem',
        xxl: '40rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
