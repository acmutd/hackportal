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
        64: '16rem',
        56: '14rem',
        '160px': '160px',
        '3/4': '75%',
        '9/10': '90%',
      },
      minHeight: {
        '1/3': '33.33%',
        '9/10': '90%',
        '1/2': '50%',
        '1/4': '25%',
        '5/8': '62.5%',
        16: '4rem',
      },
      backgroundColor: (theme) => ({
        lightBackground: '#F4F4F4',
        aqua: '#D8F8FF',
        darkAqua: '#B0F1FF',
        gunmetal: '#252b33',
        oldlav: '#675d7b',
        wisteria: '#c59ad5',
        capri: '#11bbfd',
      }),
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
