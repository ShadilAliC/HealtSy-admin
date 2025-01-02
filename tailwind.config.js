/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CB1B5B",
        secondary: "#D86B0B",
        success: "#0FB450",
        danger: "rgb(var(--danger)",
        warning: "rgb(var(--warning)",
        info: "rgb(var(--info)",
        light: "rgb(var(--light)",
        dark: "rgb(var(--dark)",
        body_color: "#FFFFFF",
        text_color:"#797979",
        bodybg_color: "#181423",
        btn_bg:"#CB1B5B",
      },
      fontFamily: {
        Mulish: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [],
}

