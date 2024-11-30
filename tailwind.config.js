/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        'input': '1fr auto'
      },
      padding: {
        'lg-header': '72px',
        'sm-header': '56px',
        '1/5': '10%',
        '1/12': 'calc((100% - 91.6%) / 2)'
      },
      backgroundColor: {
        'neutral-850': '#202020',
        'neutral-880': '#191919'
      },
      minWidth: {
        '50-8': 'calc(50% - 4px)'
      },
      maxWidth: {
        '4/5': '80%'
      }
    },
  },
  plugins: [],
}

