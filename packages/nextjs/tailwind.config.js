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
          // ...require("daisyui/src/theming/themes")["lemonade"],

          // primary: "#93BBFB",
          // primary: "#419400",
          primary: "#205D4F",
          
          // "primary-content": "#212638",
          "primary-content": "#fafafa",
          
          // secondary: "#DAE8FF",
          secondary: "#d1dec8",
          
          "secondary-content": "#212638",
          accent: "#93BBFB",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",


          // "base-200": "#f4f8ff",
          "base-200": "#f5f5f5",


          "base-300": "#DAE8FF",

          "base-content": "#212638",
          

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
          // ...require("daisyui/src/theming/themes")["synthwave"],

          // primary: "#212638",
          // primary: "#419400",
          primary: "#205D4F",

          "primary-content": "#F9FBFF",
          // secondary: "#323f61",
          secondary: "#d1dec8",

          "secondary-content": "#F9FBFF",
          // "secondary-content": "#212638",
          
          accent: "#4969A6",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#385183",
          
          // "base-100": "#385183",
          "base-100": "#575859",


          // "base-200": "#2A3655",
          "base-200": "#3a3a3a",
          
          "base-300": "#212638",
          "base-content": "#F9FBFF",
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
