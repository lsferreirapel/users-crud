import { ChakraTheme, extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { typography } from "./typography";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  ...typography,
  ...colors,
  styles: {
    global: {
      background: "background",
      body: {
        background: "background",
      },
    },
  },
} as Partial<ChakraTheme>);
