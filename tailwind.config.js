/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA351',
        secondary: '#FFBE7B',
        third: '#EED971'
      },
      boxShadow: {
        neu: '8px 8px 16px #DFA162, -8px -8px 16px #FFD8A3',
        insetNeu: 'inset 8px 8px 16px #DFA162, inset -8px -8px 16px #FFD8A3',
      },
    },
  },
  plugins: [],
}

