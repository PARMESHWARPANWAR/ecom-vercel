module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#0071C5",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
