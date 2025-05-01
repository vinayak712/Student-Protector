/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "star-movement-top": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(250%)" },
          "100%": { transform: "translateX(0)" },
        },
        "star-movement-bottom": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-250%)" },
          "100%": { transform: "translateX(0)" },
        },
        "border-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "star-movement-top":
          "star-movement-top var(--speed, 6s) linear infinite",
        "star-movement-bottom":
          "star-movement-bottom var(--speed, 6s) linear infinite",
        "border-rotate": "border-rotate 3s linear infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
