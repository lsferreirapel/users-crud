import { ChakraTheme } from "@chakra-ui/react";

import { pr } from "../utils/ptToRem";

export const typography = {
  fonts: {
    body: "'Mulish', sans-serif",
    heading: "'Mulish', sans-serif",
    mono: "'Mulish', sans-serif",
  },
  fontSizes: {
    xs: pr(9),
    sm: pr(12),
    md: pr(14),
    lg: pr(16),
    xl: pr(20),
    "2xl": pr(24),
    "3xl": pr(31),
    "4xl": pr(39),
    "5xl": pr(48),
    "6xl": pr(62),
    "7xl": pr(64),
  },
  fontWeights: {
    thin: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  textStyles: {
    Heading: {
      "H1-Bold": {
        fontSize: "6xl",
        fontWeight: "bold",
      },
      "H1-Regular": {
        fontSize: "6xl",
        fontWeight: "regular",
      },
      "H2-Bold": {
        fontSize: "5xl",
        fontWeight: "bold",
      },
      "H2-Regular": {
        fontSize: "5xl",
        fontWeight: "regular",
      },
      "H3-Bold": {
        fontSize: "4xl",
        fontWeight: "bold",
      },
      "H3-Regular": {
        fontSize: "4xl",
        fontWeight: "regular",
      },
      "H4-Bold": {
        fontSize: "3xl",
        fontWeight: "bold",
      },
      "H4-Regular": {
        fontSize: "3xl",
        fontWeight: "regular",
      },
      "H5-Bold": {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      "H5-Regular": {
        fontSize: "2xl",
        fontWeight: "regular",
      },
      "H6-Bold": {
        fontSize: "lg",
        fontWeight: "bold",
      },
      "H6-Regular": {
        fontSize: "lg",
        fontWeight: "regular",
      },
    },
    Display: {
      Bold: {
        fontSize: "7xl",
        fontWeight: "bold",
      },
      Semibold: {
        fontSize: "7xl",
        fontWeight: "semibold",
      },
    },
    Title: {
      Bold: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      Regular: {
        fontSize: "2xl",
        fontWeight: "regular",
      },
    },
    Headline: {
      Bold: {
        fontSize: "lg",
        fontWeight: "bold",
      },
      Regular: {
        fontSize: "lg",
        fontWeight: "regular",
      },
    },
    Body: {
      "1-Semibold": {
        fontSize: "lg",
        fontWeight: "semibold",
      },
      "1-Regular": {
        fontSize: "lg",
        fontWeight: "regular",
      },
      "2-Semibold": {
        fontSize: "md",
        fontWeight: "semibold",
      },
      "2-Regular": {
        fontSize: "md",
        fontWeight: "regular",
      },
    },
    Captions: {
      Bold: {
        fontSize: "sm",
        fontWeight: "bold",
      },
      Regular: {
        fontSize: "sm",
        fontWeight: "regular",
      },
    },
    Menu: {
      "1-Bold": {
        fontSize: "lg",
        fontWeight: "bold",
      },
      "1-Regular": {
        fontSize: "lg",
        fontWeight: "regular",
      },
      "2-Bold": {
        fontSize: "md",
        fontWeight: "semibold",
      },
      "2-Regular": {
        fontSize: "md",
        fontWeight: "regular",
      },
    },
    Notification: {
      Bold: {
        fontSize: "xs",
        fontWeight: "bold",
      },
      Regular: {
        fontSize: "xs",
        fontWeight: "regular",
      },
    },
  },
  // lineHeights: {
  //   normal: "normal",
  //   none: 1,
  //   shorter: 1.25,
  //   short: 1.375,
  //   base: 1.5,
  //   tall: 1.625,
  //   taller: "2",
  //   "3": ".75rem",
  //   "4": "1rem",
  //   "5": "1.25rem",
  //   "6": "1.5rem",
  //   "7": "1.75rem",
  //   "8": "2rem",
  //   "9": "2.25rem",
  //   "10": "2.5rem",
  // },
  // letterSpacings: {
  //   tighter: "-0.05em",
  //   tight: "-0.025em",
  //   normal: "0",
  //   wide: "0.025em",
  //   wider: "0.05em",
  //   widest: "0.1em",
  // },
} as Partial<ChakraTheme>;
