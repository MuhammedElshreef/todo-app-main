/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "23rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        Josefin: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        primary: "#3A7BFD",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
