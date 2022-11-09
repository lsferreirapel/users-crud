import React from "react";

import { ToogleModeButton } from "@atomic/atoms/ToogleModeButton";
import { EditIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HEADER_HEIGHT } from "@common/constants";
import { IUser } from "@common/types/api";
import { formatRole } from "@common/utils/format";
import { pr } from "@common/utils/ptToRem";
import { useAuth } from "@services/auth/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { MenuBar } from "../SideBar/MenuBar";

type HeaderProps = {
  user?: IUser;
};

export function Header({ user }: HeaderProps) {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const enableHamburgerMenu = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      h={pr(HEADER_HEIGHT)}
      w="100vw"
      bg="background"
      borderBottomWidth={1}
      borderColor="separator2"
      position="fixed"
      zIndex="sticky"
      alignItems="center"
      justifyContent="space-between"
      px="4"
    >
      <Flex alignItems="center" gap="2">
        {enableHamburgerMenu && <MenuBar />}
        <Text
          textStyle="Heading.H5-Bold"
          display={{ base: "none", sm: "flex" }}
          fontSize={{ base: "lg", lg: "2xl" }}
          color="title"
        >
          CRUD de usuários
        </Text>
      </Flex>
      <Flex gap="1">
        <ToogleModeButton />
        <Menu>
          <MenuButton>
            <Flex gap="2">
              <Image
                alt="Profile image"
                fallback={
                  <Box boxSize={10} bg="gray.300" borderRadius="full" />
                }
              />
              <Flex
                display={{ base: "none", sm: "flex" }}
                flexDirection="column"
                alignItems="flex-start"
                mr="2"
              >
                <Text
                  color="title"
                  textStyle="Headline.Bold"
                  fontSize={{ base: "md", lg: "lg" }}
                >
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text textStyle="Captions.Regular" color="body2">
                  {formatRole(user?.role)}
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuItem
              icon={<EditIcon />}
              value="profile"
              onClick={() => navigate("/private/profile")}
            >
              Editar perfil
            </MenuItem>
            <MenuItem
              icon={<Icon as={BiLogOut} />}
              value="logout"
              onClick={logout}
            >
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
