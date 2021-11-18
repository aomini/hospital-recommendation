module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gold: "#FEC260",
        purple: "#A12568",
        dark: "#2A0944",
        lighter: "#3B185F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
