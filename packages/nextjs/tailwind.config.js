/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0fa3a0",  // Verde principal
          "primary-content": "#fafafa",  // Color de texto en tema claro
          // secondary: "#77a155",  // Verde intermedio
          secondary: "#0fa3a0",

          "secondary-content": "#212638",
          accent: "#93BBFB",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",  // Fondo blanco
          "base-200": "#f5f5f5",  // Fondo suave
          "base-300": "#DAE8FF",  // Fondo de elementos
          "base-content": "#212638",  // Texto base
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          "--rounded-btn": "9999rem",
          ".tooltip": { "--tooltip-tail": "6px" },
          ".link": { textUnderlineOffset: "2px" },
          ".link:hover": { opacity: "80%" },
        },
      },
      {
        dark: {
          primary: "#0fa3a0",  // Verde principal en tema oscuro
          "primary-content": "#F9FBFF",  // Texto claro en modo oscuro
          // secondary: "#77a155",  // Verde intermedio en modo oscuro
          secondary: "#0fa3a0",
          "secondary-content": "#F9FBFF",  // Texto claro en modo oscuro
          accent: "#4969A6",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",  // Fondo claro en tema oscuro
          "neutral-content": "#385183",  // Texto oscuro
          "base-100": "#575859",  // Fondo oscuro
          "base-200": "#3a3a3a",  // Fondo de elementos oscuro
          "base-300": "#212638",  // Fondo oscuro más profundo
          "base-content": "#F9FBFF",  // Texto claro en fondo oscuro
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          "--rounded-btn": "9999rem",
          ".tooltip": { "--tooltip-tail": "6px", "--tooltip-color": "oklch(var(--p))" },
          ".link": { textUnderlineOffset: "2px" },
          ".link:hover": { opacity: "80%" },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: { center: "0 0 12px -2px rgb(0 0 0 / 0.05)" },
      animation: { "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" },
    },
  },
};
