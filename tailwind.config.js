/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oren: "#EA580C",
        orenMuda: "#FDBA74",
        biru: "#0C0A09",
      },
      animation: {
        "spin-slow": "bounce 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
