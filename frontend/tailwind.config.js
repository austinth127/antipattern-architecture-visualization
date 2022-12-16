/** @type {import('tailwindcss').Config} */
module.exports = {
    // This means to apply tailwind to all files like this
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    // Extend the base tailwind elements here
    theme: {
        extend: {},
    },
    plugins: [],
    darkMode: "class",
};
