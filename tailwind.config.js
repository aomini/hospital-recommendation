module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    cursor: {
      pointer: "pointer",
      "not-allowed": "not-allowed",
    },

    extend: {
      colors: {
        gold: "#FEC260",
        purple: "#A12568",
        dark: "#2A0944",
        lighter: "#3B185F",
      },
      backgroundImage: {
        map: "url('./assets/images/ktm-map.png')",
      },
      minWidth: {
        xxs: "80px",
      },
      fontSize: {
        tiny: ".6rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
