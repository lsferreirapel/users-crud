import { ChakraTheme, extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  ...typography,
  ...colors,
  ...spacing,
  styles: {
    global: {
      background: "background2",
      body: {
        background: "background2",
      },
    },
  },
} as Partial<ChakraTheme>);
