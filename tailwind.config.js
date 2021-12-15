module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-blue': '#458ECC',
      }
    },
    fontFamily: {
      'std': ['Hiragino Maru'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [

  ],
}
