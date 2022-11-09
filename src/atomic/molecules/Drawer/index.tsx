import React, { PropsWithChildren } from "react";

import {
  Button,
  ButtonProps,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";

export type CustomDrawerProps = PropsWithChildren<
  {
    title: string;
    submitButtonProps?: ButtonProps;
  } & DrawerProps
>;

export function Drawer({
  title,
  submitButtonProps,
  children,
  ...props
}: CustomDrawerProps) {
  return (
    <ChakraDrawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={props?.onClose}>
            Cancelar
          </Button>
          <Button colorScheme="primary" {...submitButtonProps}>
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}
