/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        outside: 'url(assets/images/bg-outside.png)',
        inside: 'url(assets/images/bg-inside.png)',
      },
      colors: {
        primary: {
          DEFAULT: '#1e233c',
          50: '#f2f5fc',
          100: '#e2eaf7',
          200: '#ccdaf1',
          300: '#a9c2e7',
          400: '#80a2da',
          500: '#6284cf',
          600: '#4e6bc2',
          700: '#4459b1',
          800: '#3c4b91',
          900: '#344174',
          950: '#1e233c',
        },
        secondary: {
          DEFAULT: '#a29475',
          50: '#f5f5f1',
          100: '#e6e4db',
          200: '#d0cab8',
          300: '#b5ab8f',
          400: '#a29475',
          500: '#908062',
          600: '#7b6a53',
          700: '#645344',
          800: '#56473d',
          900: '#4b3f38',
          950: '#2a221e',
        },
      },
    },
  },
  plugins: [],
}
