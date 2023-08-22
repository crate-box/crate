import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

export default {
  content: [""],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      primary: {
        DEFAULT: "hsl(84, 44%, 61%)",
        light: "hsl(84, 44%, 72%)",
        dark: "hsl(84, 44%, 50%)",
      },
      secondary: {
        DEFAULT: "hsl(202, 30%, 12%)",
        light: "hsl(202, 30%, 20%)",
        dark: "hsl(202, 30%, 6%)",
      },
      success: {
        DEFAULT: "hsl(84, 44%, 61%)",
        light: "hsl(84, 44%, 72%)",
        dark: "hsl(84, 44%, 53%)",
      },
      warning: {
        DEFAULT: "hsl(48, 77%, 65%)",
        light: "hsl(48, 77%, 74%)",
        dark: "hsl(48, 77%, 54%)",
      },
      info: {
        DEFAULT: "hsl(217, 88%, 67%)",
        light: "hsl(217, 88%, 77%)",
        dark: "hsl(217, 88%, 56%)",
      },
      destructive: {
        DEFAULT: "hsl(359, 68%, 70%)",
        light: "hsl(359, 68%, 78%)",
        dark: "hsl(359, 68%, 62%)",
      },
      slate: {
        50: "hsl(202, 30%, 93%)",
        100: "hsl(202, 30%, 84%)",
        200: "hsl(202, 30%, 73%)",
        300: "hsl(202, 30%, 64%)",
        400: "hsl(202, 30%, 52%)",
        500: "hsl(202, 30%, 40%)",
        600: "hsl(202, 30%, 24%)",
        700: "hsl(202, 30%, 16%)",
        800: "hsl(202, 30%, 12%)",
        900: "hsl(202, 30%, 7%)",
        950: "hsl(202, 30%, 5%)",
      },
    },
    fontFamily: {
      sans: [
        "var(--global-font-family)",
        "var(--font-sans)",
        ...defaultTheme.fontFamily.sans,
      ],
      heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
      mono: [
        "var(--editor-font-family)",
        "monospace",
        ...defaultTheme.fontFamily.mono,
      ],
    },
    fontSize: {
      sm: "0.75rem",
      base: "0.875rem",
      lg: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3rem",
      "6xl": "3.5rem",
      "7xl": "4rem",
    },
    extend: {
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDown: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: { transform: "translateX(0)" },
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
    },
  },
  plugins: [
    // @link https://www.radix-ui.com/docs/primitives/components/navigation-menu
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      })
    }),
  ],
} satisfies Config
