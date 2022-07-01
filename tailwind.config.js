// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Whyte", ...defaultTheme.fontFamily.sans],
        mono: ["GroteskSemi", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        night: {
          100: "#E7E8E9",
          200: "#CFD1D4",
          300: "#B7BABE",
          400: "#9FA3A9",
          500: "#888C93",
          600: "#70747D",
          700: "#404652",
          800: "#282F3D",
          900: "#101827",
        },
        ruby: {
          100: "#FCE9E9",
          200: "#F8D4D4",
          300: "#F5BEBE",
          400: "#F1A8A8",
          500: "#EE9393",
          600: "#EA7D7D",
          700: "#E76767",
          800: "#E03C3C",
          900: "#DC2626",
          1000: "#C62222",
          1400: "#841717",
        },
        honey: {
          25: "#FFFDF7",
          50: "#FFFAEF",
          100: "#FEF5DF",
          200: "#FEF0D0",
          300: "#FDEBC0",
          400: "#FDE7B0",
          500: "#FCE2A0",
          600: "#FCDD90",
          700: "#FBD881",
          800: "#FBD371",
          900: "#FACE61",
        },
      },
      keyframes: {
        "bounce-right-to-left": {
          "0%, 100%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(-20%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "bounce-bottom-to-top": {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-20%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "rotate-right-to-left": {
          "100%": {
            transform: "rotate(180deg)",
          },
        },
        "rotate-back": {
          from: {
            transform: "rotate(180deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
        drift: {
          from: {
            "background-position-x": "0",
          },
          to: {
            "background-position-x": "100vw",
          },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "bounce-right-to-left": "bounce-right-to-left 1s ease-in-out infinite",
        "bounce-bottom-to-top": "bounce-bottom-to-top 1s ease-in-out infinite",
        "rotate-180": "rotate-right-to-left 0.2s forwards linear",
        "rotate-back": "rotate-back 0.2s forwards linear",
        drift: "drift 30s linear infinite",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
