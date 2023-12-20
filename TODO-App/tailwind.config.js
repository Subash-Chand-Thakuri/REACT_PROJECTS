/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: ['focus'],
    },
    maxWidth: {
      '1/2': '50%',
    }
  },
  plugins: [],
}

