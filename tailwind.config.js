module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['wavehaus'],
      },
      width: {
        '1/8': '12.5%',
        '3/8': '37.5%',
        '5/8': '62.5%',
        '7/8': '87.5%',
        '1/7': '14.29%',
        '6/7': '85.71%',
      },
      height: {
        '9/10': '90%',
      },
      minWidth: {
        '3/4': '75%',
        '9/10': '90%',
      },
      minHeight: {
        '1/3': '33.33%',
        '9/10': '90%',
        '1/2': '50%',
        '1/4': '25%',
        '5/8': '62.5%',
      },
      backgroundColor: (theme) => ({
        lightBackground: '#F4F4F4',
        aqua: '#D8F8FF',
        darkAqua: '#B0F1FF',
      }),
      backgroundImage: {
        'hero-pattern': `url(${'/assets/bg2.jpeg'})`, // !change
      },
      colors: {
        // !change
        // primary: '#F2F3FF',
        // primaryDark: '#C1C8FF',
        // secondary: '#D8F8FF', //turquoise
        // secondaryDark: '#B0F1FF',
        // complementary: '#FDECFF', //pink
        // complementaryDark: '#F8ACFF',
        primary: '#F99DE3',
        primaryDark: '#C0329D',
        secondary: '#7AE194', //turquoise
        secondaryDark: '#009C28',
        complementary: '#FFAE73', //pink
        complementaryDark: '#BE6625',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
