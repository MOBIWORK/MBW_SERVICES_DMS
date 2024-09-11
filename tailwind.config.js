/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./mbw_dms/**/**/*.{html,js}"],
  // Add any other custom configurations here
  theme: {
    extend: {
      fontFamily: "Inter",
      screens: {
        "1k": "1000px",
        "1kr": "1280px",
        "1_5k" :"1400px ",
        "2_5k" :"1920px",
      }
    },
  },
  plugins: [],
};