// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue-600
        secondary: "#f59e42", // orange-400
        accent: "#10b981", // emerald-500
        background: "red", // gray-50
        surface: "#ffffff", // white
        muted: "#6b7280", // gray-500
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        card: "0 2px 8px 0 rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
