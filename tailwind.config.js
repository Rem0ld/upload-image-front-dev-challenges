module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
      keyframes: {
        loader: {
          "0%": { left: "-50%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        loader: "1.5s loader linear infinite forwards",
      },
    },
  },
  plugins: [],
};
