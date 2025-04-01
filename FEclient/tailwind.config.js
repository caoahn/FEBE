/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import aspectRatio from '@tailwindcss/aspect-ratio';
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      fontFamily: {
        inter: ["Inter", 'sans-serif'],
        mulish: ["Mulish", 'san-serif'],
        roboto: ["Roboto", 'san-serif'],
        murecho: ["Murecho", 'san-serif']
      },
      boxShadow: {
        serviceBox: '0px 4px 48.9px 6px #6F6F6F40',
        newsEventsBox: '0px 3.28px 3.28px 0px #00000040',
        bannerNewsEvents: '0px 3.34px 3.34px 0px #00000040',
      },
      colors: {
        blue: {
          'light': '#C6E6FF',
          'bold': '#01579B',
          'extra_bold': '#003865',
          'text': '#01579B',
          'aboutus': '#6EC0FF',
          'background': '#6EC0FF',
          'contactus': '#33A5FE'
        },
        red: {
          'light': '#FFD3C5',
          'bold': '#DD2C00',
          'extra_bold': '#B22D04',
          'text': '#DD2C00'
        },
        gray: {
          'light': '#C4C5C7',
          'bold': '#576F83',
          'extra_bold': '#42525F',
          'text': '#576F83',
          'footer': '#D9D9D9',
          'copyright': '#767676'
        },
        green: {
          'light': '#A9DDE4',
          'bold': '#00BCD4',
          'extra_bold': '#006774'
        }
      },
      backgroundImage: {
        'blue_gradient': 'linear-gradient(to right, #1F6398, #33A5FE)',
        'blue_gradient_2': 'linear-gradient(to bottom, #1F6398, #33A5FE)'
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('max-md', '@media (max-width: 767px)');
      addVariant('max-xl', '@media (max-width: 1280px)');
    },
    aspectRatio
  ]
})
