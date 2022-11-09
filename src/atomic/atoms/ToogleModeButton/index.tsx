import React from "react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";

export function ToogleModeButton(props: Partial<IconButtonProps>) {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toogle aplication color mode"
      variant="ghost"
      icon={
        colorMode === "dark" ? (
          <SunIcon w="5" h="5" />
        ) : (
          <MoonIcon w="5" h="5" />
        )
      }
      onClick={toggleColorMode}
      {...props}
    />
  );
}
