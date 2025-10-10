/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F5F5DC',      // A classic beige background
        'card-bg': '#FFFBEB',        // A lighter, creamy color for cards
        'primary-text': '#3A3A3A',    // A dark, earthy text color for readability
        'accent': '#D9534F',         // A slightly muted, warm red for accents
      },
      fontFamily: {
        // Ensuring your selected fonts are available as utility classes
        'dancing': ['"Dancing Script"', 'cursive'],
        'pacifico': ['"Pacifico"', 'cursive'],
        'lora': ['Lora', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
         
      },
    },
  },
  plugins: [],
}