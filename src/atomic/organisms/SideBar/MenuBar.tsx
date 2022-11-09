import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";
import { useNavigate } from "react-router-dom";

import { menuLinks } from "./menu-links";

export function MenuBar(props: Partial<MenuProps>) {
  const navigate = useNavigate();

  return (
    <Menu {...props}>
      <MenuButton
        as={IconButton}
        aria-label="Menu hamburguer"
        icon={<HamburgerIcon w={pr(20)} h={pr(20)} />}
      />
      <MenuList>
        {menuLinks.map((link) => (
          <MenuItem
            value={link.href}
            key={link.href}
            isDisabled={link.disabled}
            onClick={() => navigate(link.href)}
          >
            {link.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
