import { ChakraTheme } from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";

export const spacing = {
  space: {
    px: "1px",
    0.5: pr(4),
    1: pr(8),
    2: pr(16),
    2.5: pr(18),
    3: pr(24),
    4: pr(32),
    5: pr(40),
    6: pr(50),
    7: pr(70),
    8: pr(90),
    9: pr(100),
  },
} as Partial<ChakraTheme>;
