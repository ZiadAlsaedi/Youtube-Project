/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        mytheme: {
          

"primary": "#5b21b6",
          

"secondary": "#f3f4f6",
          

"accent": "#00ffff",
          

"neutral": "#1c1917",
          

"base-100": "#1c1917",
          

"info": "#2563eb",
          

"success": "#00ff00",
          

"warning": "#00ff00",
          

"error": "#ff0000",
          },
        },
      ],
    },
  
}

