import React from "react";

import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

export type TableActionsProps = {
  value: any;
  onDelete?: (value: any) => void;
  onEdit?: (value: any) => void;
};

export function TableActions(props: TableActionsProps) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Edit item"
        colorScheme="gray"
        variant="ghost"
        icon={<Icon as={HiDotsVertical} />}
      />
      <MenuList minWidth="240px">
        <MenuItem
          icon={<EditIcon />}
          value="edit"
          onClick={() => props?.onEdit?.(props?.value)}
        >
          Editar usuário
        </MenuItem>
        <MenuItem
          icon={<DeleteIcon />}
          value="remove"
          onClick={() => props?.onDelete?.(props?.value)}
        >
          Excluir usuário
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
