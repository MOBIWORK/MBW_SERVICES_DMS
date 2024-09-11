/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: "Inter"
    },
    screens: {
      "1k": "1000px",
      "1kr": "1280px",
      "1_5k" :"1400px ",
      "2_5k" :"1920px",
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

