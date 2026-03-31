/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Los colores de tu logo (Cian de React y Azul de C#)
        'react-blue': '#61dbfb',
        'csharp-purple': '#a179dc',
        'dark-bg': '#0a0f1a',
      },
    },
  },
  plugins: [],
}