/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors:{
        grey1:'#82869A',
        textGrey:'#333333',
        lightGrey:'#f8f8f8'
      },
      boxShadow: {
        'custom': '0 1px 10px rgba(0, 0, 0, 0.1)', // Customize as needed
      },
    },
  },
  plugins: [],
}

