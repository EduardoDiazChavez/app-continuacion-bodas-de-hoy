const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      "body": ['Montserrat', ...defaultTheme.fontFamily.sans],
      "display": ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend :{
      colors: {
        primary: "#F7628C",  
        secondary: "#87F3B5",
        tertiary: "#FBFF4E", 
        base: "#F2F2F2",
  
      },
    }
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    require('@tailwindcss/forms')
  ],

}
