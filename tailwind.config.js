// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
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
      },
      animation: {
        "bounce-right-to-left": "bounce-right-to-left 1s ease-in-out infinite",
        "bounce-bottom-to-top": "bounce-bottom-to-top 1s ease-in-out infinite",
        "rotate-180": "rotate-right-to-left 0.2s forwards linear",
        "rotate-back": "rotate-back 0.2s forwards linear",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
