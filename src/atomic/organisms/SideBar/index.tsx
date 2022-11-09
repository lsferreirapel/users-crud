import React from "react";

import { SidebarMenuItem } from "@atomic/molecules/SidebarMenuItem";
import { Flex } from "@chakra-ui/react";
import { HEADER_HEIGHT, SIDEBAR_SMALL_WIDTH } from "@common/constants";
import { pr } from "@common/utils/ptToRem";
import { useAuth } from "@services/auth/AuthContext";
import { BiLogOut } from "react-icons/bi";

import { menuLinks } from "./menu-links";

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      w={pr(SIDEBAR_SMALL_WIDTH)}
      h="100vh"
      flexDir="column"
      transition=".3s"
      bg="background"
      borderRightWidth={1}
      borderColor="separator2"
      zIndex="dropdown"
      position="fixed"
      pb={pr(HEADER_HEIGHT)}
    >
      <Flex
        flex={1}
        flexDir="column"
        overflow="hidden"
        alignItems="center"
        px="2"
        py="4"
      >
        {menuLinks.map((item) => (
          <React.Fragment key={item.href}>
            <SidebarMenuItem
              href={item.href}
              icon={item.icon}
              label={item.label}
              isDisabled={item.disabled}
            />
          </React.Fragment>
        ))}
        <Flex flex={1} w="100%" alignItems="flex-end">
          <SidebarMenuItem
            href="/logout"
            icon={BiLogOut}
            label="Sair"
            onClick={logout}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
