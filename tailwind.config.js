/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA351FF',
        secondary: '#FFBE7BFF',
        third: '#EED971FF'
        // ...
      },
    },
  },
  plugins: [],
}

