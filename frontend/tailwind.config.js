/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",  // Include only the root directory
    "./components/**/*.{js,ts,jsx,tsx}", // Optional: Add specific folders if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
