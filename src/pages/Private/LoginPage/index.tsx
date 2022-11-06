import React from "react";

import { Box, Button, Text, useColorMode } from "@chakra-ui/react";

export function LoginPage() {
  const { toggleColorMode } = useColorMode();

  return (
    <Box bg="background">
      <Text textStyle="Heading.H4-Bold">LoginPage</Text>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </Box>
  );
}
