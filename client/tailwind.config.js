/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all relevant files in the src directory
  ],
  theme: {
    extend: {
      // You can extend the theme with custom colors, fonts, etc.
    },
  },
  darkMode: 'class', // Enables dark mode using a class toggle
  plugins: [],
}
