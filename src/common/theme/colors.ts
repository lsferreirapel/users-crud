import { ChakraTheme } from "@chakra-ui/react";

import { createColorModeSemanticToken } from "../utils/theme";

export const colors = {
  colors: {
    // Base Colors
    white: "#FFFFFF",
    black: "#000000",

    // Gradients
    purple: {
      50: "#ece9ff",
      100: "#c6bff7",
      200: "#a196eb",
      300: "#7b6ce1",
      400: "#5541d7",
      500: "#3c28be",
      600: "#2e1f94",
      700: "#20156b",
      800: "#120c42",
      900: "#07031c",
    },

    lightblue: {
      50: "#ddf5ff",
      100: "#b2ddfe",
      200: "#85c4f8",
      300: "#58acf3",
      400: "#2b95ee",
      500: "#117bd4",
      600: "#0560a6",
      700: "#004578",
      800: "#00294b",
      900: "#000f1f",
    },

    lightgreen: {
      50: "#dffbf7",
      100: "#bfede3",
      200: "#9ddfd0",
      300: "#79d1bd",
      400: "#55c4aa",
      500: "#3baa91",
      600: "#2b8471",
      700: "#1b5f51",
      800: "#0a3a2f",
      900: "#00160f",
    },

    lightorange: {
      50: "#fff2dc",
      100: "#fedab1",
      200: "#fac383",
      300: "#f7ab55",
      400: "#f39325",
      500: "#F2870D",
      600: "#a95f06",
      700: "#7a4403",
      800: "#4b2800",
      900: "#1d0d00",
    },

    darkblue: {
      50: "#dbf4ff",
      100: "#CCE7FF",
      200: "#addbff",
      300: "#66B6FF",
      400: "#4aa9ff",
      500: "#0D8BFF",
      600: "#0077e6",
      700: "#005099",
      800: "#002851",
      900: "#001B33",
    },

    darkorange: {
      50: "#fff2de",
      100: "#FBE7D0",
      200: "#f7c488",
      300: "#F4B871",
      400: "#f3ac59",
      500: "#EE952D",
      600: "#d47a11",
      700: "#8E520B",
      800: "#75440e",
      900: "#2F1B04",
    },

    darkgreen: {
      50: "#ddfff5",
      100: "#CEFDED",
      200: "#b2fde2",
      300: "#71FACA",
      400: "#22f7ac",
      500: "#09F6A3",
      600: "#00ac72",
      700: "#059462",
      800: "#117b54",
      900: "#023121",
    },

    pink: {
      50: "#ffe2ef",
      100: "#FFCCDD",
      200: "#ff7faa",
      300: "#FF6699",
      400: "#ff1a65",
      500: "#FF0054",
      600: "#b4003b",
      700: "#990033",
      800: "#7e052b",
      900: "#330011",
    },
  },
  semanticTokens: {
    colors: {
      // Base Colors
      ...createColorModeSemanticToken("primary", "purple", "darkblue"),
      ...createColorModeSemanticToken("secondary", "lightblue", "darkorange"),
      ...createColorModeSemanticToken("accent1", "lightgreen", "darkgreen"),
      ...createColorModeSemanticToken("accent2", "lightorange", "pink"),

      // Text Colors
      title: {
        default: "#11142D",
        _dark: "white",
      },
      body1: {
        default: "#92929D",
        _dark: "#92929D",
      },
      body2: {
        default: "#9A9AB0",
        _dark: "#9A9AB0",
      },
      link: {
        default: "#5541D7",
        _dark: "#0D8BFF",
      },

      // Background Colors
      background: {
        default: "white",
        _dark: "#1F1D2B",
      },
      background2: {
        default: "#F7F7FC",
        _dark: "#252836",
      },

      // Others Colors
      warning: {
        default: "#EEAF22",
        _dark: "#FFC839",
      },
      error: {
        default: "#F04461",
        _dark: "#F04461",
      },
      success: {
        default: "#41DA7E",
        _dark: "#13FF71",
      },
      info: {
        default: "#F1F1F6",
        _dark: "#404557",
      },

      // Separators Colors
      separator1: {
        default: "#E1E1FB",
        _dark: "#3C4156",
      },
      separator2: {
        default: "#E1E1E1",
        _dark: "#3C4156",
      },

      // Fills Colors
      textField: {
        default: "white",
        _dark: "#21242E",
      },
      textField2: {
        default: "#F6F6F7",
        _dark: "#21242E",
      },
      buttonFill: {
        default: "white",
        _dark: "#3D435A",
      },
      disabled: {
        default: "#E0E0E0",
        _dark: "#E0E0E0",
      },
    },
  },
} as Partial<ChakraTheme>;
