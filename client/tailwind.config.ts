import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        Neutral: {
          50: "#F6F6F6",
          75: "#BABABA",
          200: "#6D6D6D",
          300: "#5D5D5D",
          500: "#131313",
          900: "#0A0A0A",
        },
        PrimaryY: {
          50: "#FFF9F1",
          300: "#FBC770",
          500: "#997944",
        },
        Secondary: {
          50: "#F4FEFB",
          500: "#599483",
        },
        Base: {
          100: "#FEFEFE",
          200: "#FFF9F1",
        },
        Tertiary: {
          300: "#33A5D2",
          400: "#247393",
        },
        PrimaryG: {
          300: "#92F3D7",
        },
        Success: "#00B569",
        "neutrals-n50": "#f6f6f6",
        "neutrals-n400": "#3a3a3a",
        "neutrals-n200": "#6d6d6d",
        "neutrals-n0": "#fff",
        "neutrals-n75": "#bababa",
        "neutrals-n500": "#131313",
        "main-primary-y300": "#fbc770",
        "denotive-error": "#eb0000",
        "main-neutrals-n300": "#5d5d5d",
        "main-secondary-g300": "#000212",
        "main-secondary-g3001": "#92f3d7",
        },
      },
      fontFamily: {
        "button-text-2": "'Space Grotesk'",
        "paragraph-c1": "Inter",
      },
      borderRadius: {
        "10xs": "3px",
        xl: "20px",
      },
      fontSize: {
        sm: "0.88rem",
        "2xs": "0.69rem",
        base: "1rem",
        "13xl": "2rem",
        lg: "1.13rem",
    },
    },
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}
export default config
