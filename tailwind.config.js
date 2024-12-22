/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': [' "Playfair Display", serif'],
        'body': ['"Lato", serif']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

