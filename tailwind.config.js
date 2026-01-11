/** @type {import('tailwindcss').Config} */
const customSpacing = {
  "7.5": "1.875rem",
  "9.5": "2.375rem",
  "13": "3.25rem",
  "15": "3.75rem",
  "17": "4.25rem",
  "18": "4.5rem",
  "23": "5.75rem",
  "30": "7.5rem",
  "42": "10.5rem",
  "45": "11.25rem",
  "58": "14.5rem",
  "62": "15.5rem",
  "73": "18.25rem",
  "78": "19.5rem",
  "105": "26.25rem",
  "107": "26.75rem",
  "200": "50rem"
};

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#f5f5f4",
          100: "#e7e7e6",
          200: "#cfcfcd",
          300: "#b7b7b4",
          400: "#7f7e7b",
          500: "#2d2c2b",
          600: "#242322",
          700: "#1b1a19",
          800: "#121110",
          900: "#0a0908",
          950: "#0a0908"
        },
        copper: {
          50: "#f8f6f3",
          100: "#efece7",
          200: "#d8d1c8",
          300: "#bfb5a8",
          400: "#8e8171",
          500: "#2f2c27",
          600: "#27241f",
          700: "#1f1c18",
          800: "#171411",
          900: "#100e0c"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      lineHeight: {
        15: "3.75rem"
      },
      spacing: customSpacing
    }
  },
  plugins: []
};
