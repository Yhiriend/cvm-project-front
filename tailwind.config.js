/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#53c178",
        customBlue: "#00a6f3",
        customBlack: "#2d2d2d",
        customBorder: "#c6c6c6"
      },
      fontFamily: {
        maxwell: ["Maxwell-Bold", "Maxwell-Light", "Maxwell-Regular", "sans"],
        maxwellBold: ["Maxwell-Bold", "sans"],
        maxwellRegular: ["Maxwell-Regular", "sans"],
        maxwellLigth: ["Maxwell-Light", "sans"],
      },
    },
  },
  plugins: [],
};
