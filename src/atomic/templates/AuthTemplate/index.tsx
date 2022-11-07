import React from "react";

import { ToogleModeButton } from "@atomic/atoms/ToogleModeButton";
import {
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";

type AuthTemplateProps = {
  loginPage?: React.ReactNode;
  registerPage?: React.ReactNode;
};

export function AuthTemplate(props: AuthTemplateProps) {
  return (
    <Center flex={1} h="100vh" flexDir="column">
      <Flex mb="5" mt="3" alignItems="center">
        <Text color="title" as="h1" textStyle="Heading.H4-Bold">
          CRUD de usuários
        </Text>
        <ToogleModeButton ml="2" />
      </Flex>
      <Tabs
        isFitted
        w="95%"
        maxW={pr(600)}
        bg="background"
        borderRadius="lg"
        colorScheme="primary"
      >
        <TabList>
          <Tab
            isDisabled={!props?.loginPage}
            color="title"
            textStyle="Menu.1-Bold"
          >
            Entrar
          </Tab>
          <Tab
            isDisabled={!props?.registerPage}
            color="title"
            textStyle="Menu.1-Bold"
          >
            Registrar
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={{ base: "2", lg: "9", sm: "5" }}>
            {props?.loginPage}
          </TabPanel>
          <TabPanel px="8">{props?.registerPage}</TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}
