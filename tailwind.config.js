/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ['"Josefin Sans", sans-serif'],
        "libre-baskerville-bold": ['"Libre Baskerville", serif'],
        "playfair": ['"Playfair", serif'],
        "inconsolata": ['"Inconsolata", monospace'],
        "inter": ['"Inter", sans-serif'],
        "inria-serif-light": ['"Inria Serif", serif'],
        "inria-serif-regular": ['"Inria Serif", serif'],
        "inria-serif-bold": ['"Inria Serif", serif'],
        "inria-serif-light-italic": ['"Inria Serif", serif'],
        "inria-serif-regular-italic": ['"Inria Serif", serif'],
        "inria-serif-bold-italic": ['"Inria Serif", serif'],
        "inria-sans-regular": ['"Inria Sans", sans-serif'],
      },
    },
  },
  plugins: [],
};
