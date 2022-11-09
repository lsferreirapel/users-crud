import React, { FunctionComponent, useMemo } from "react";

import {
  Button,
  ButtonProps,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";
import { useLocation, useNavigate } from "react-router-dom";

export type SidebarMenuItemProps = {
  label: string;
  href: string;
  icon: FunctionComponent;
} & ButtonProps;

export const SidebarMenuItem = ({
  label,
  href,
  icon,
  ...props
}: SidebarMenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSmall = useBreakpointValue({
    base: true,
    xl: true,
  });

  const isActive = useMemo(
    () => location.pathname.includes(href),
    [href, location.pathname]
  );

  return (
    <Tooltip
      label={isSmall ? label : undefined}
      isDisabled={!isSmall}
      placement="left"
    >
      {isSmall ? (
        <IconButton
          w="100%"
          h={pr(50)}
          my="1"
          bg={isActive ? "primary.500" : undefined}
          variant={isActive ? "solid" : "ghost"}
          colorScheme={isActive ? "primary" : "gray"}
          aria-label="button"
          onClick={() => navigate(href)}
          icon={
            <Icon
              w={pr(22)}
              h={pr(22)}
              as={icon}
              color={isActive ? "white" : "title"}
            />
          }
          {...props}
        />
      ) : (
        <Button
          w="100%"
          my="1"
          bg={isActive ? "primary.500" : undefined}
          variant={isActive ? "solid" : "ghost"}
          colorScheme={isActive ? "primary" : "gray"}
          {...props}
          justifyContent="flex-start"
          onClick={() => navigate(href)}
        >
          <Icon
            w={pr(20)}
            h={pr(20)}
            mr={2}
            as={icon}
            color={isActive ? "white" : "title"}
          />
          <Text
            whiteSpace="nowrap"
            textStyle="Menu.1-Bold"
            color={isActive ? "white" : "title"}
          >
            {label}
          </Text>
        </Button>
      )}
    </Tooltip>
  );
};
