module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: `IBM Plex Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
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
      // HackAI '22 Colors
      colors: {
        blue: {
          550: '#00B9FF',
          650: '#3980B3',
          750: '#203150',
        },
        purple: {
          750: '#957CA6',
          850: '#422E50',
        },
        pink: {
          150: '#F3E2FF',
        },
        stone: {
          550: 'B4B4B4',
          650: '#808080',
          750: '#424242',
          850: '#232136',
        },
        slate: {
          250: '#E8E8E7',
        },
        violet: {
          350: '#B5A6FE',
          450: '#939AD8',
          750: '#7965DE',
          850: '#732EE2',
        },
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
