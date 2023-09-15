import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       "main-neutrals-n0": "#fff",
  //       cadetblue: "#599483",
  //       "neutrals-n500": "#131313",
  //       "main-primary-y500": "#997944",
  //       "main-primary-y300": "#fbc770",
  //       "main-neutrals-n300": "#5d5d5d",
  //       "main-neutrals-n900": "#0a0a0a",
  //       "main-secondary-g50": "#f4fefb",
  //     },
  //     spacing: {},
  //     fontFamily: {
  //       "paragraph-body-text-1": "'Space Grotesk'",
  //       "paragraph-c1": "Inter",
  //     },
  //   },
  //   fontSize: {
  //     base: "1rem",
  //     sm: "0.88rem",
  //     "2xs": "0.69rem",
  //     "5xl": "1.5rem",
  //     "21xl": "2.5rem",
  //     inherit: "inherit",
  //   },
  // },
  plugins: [],
}
export default config
