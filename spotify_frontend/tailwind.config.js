/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "1/12": "8.33%",
        "11/12": "91.7%",
      },
      backgroundColor: {
        "app-black": "#121212",
      },
    },
  },
  plugins: [],
};
