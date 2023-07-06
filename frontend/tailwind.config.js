/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#503b31",
        inside_input: "#aa4040",
        light_grey: "#e5e5e5",
      },
    },
  },
  plugins: [],
};
