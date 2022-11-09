import React from "react";

import { Button, ButtonProps, Flex, FlexProps, Text } from "@chakra-ui/react";

type TitleProps = {
  text: string;
  addButtonProps?: ButtonProps;
} & FlexProps;

export function Title({ text, addButtonProps, ...props }: TitleProps) {
  return (
    <Flex
      w="100%"
      mb="3"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Text
        color="title"
        textStyle="Heading.H5-Bold"
        textTransform="capitalize"
      >
        {text}s
      </Text>
      <Button colorScheme="primary" size="sm" {...addButtonProps}>
        Adicionar {text?.toLowerCase() ?? ""}
      </Button>
    </Flex>
  );
}
