import React, { PropsWithChildren } from "react";

import { Header } from "@atomic/organisms/Header";
import { Sidebar } from "@atomic/organisms/SideBar";
import { Flex } from "@chakra-ui/react";
import { HEADER_HEIGHT, SIDEBAR_SMALL_WIDTH } from "@common/constants";
import { useCustomQuery } from "@common/hooks/useCustomQuery";
import { removeCookie } from "@common/utils/cookies";
import { pr } from "@common/utils/ptToRem";
import { fetchMe } from "@services/auth/auth";
import { useNavigate } from "react-router-dom";

export function PrivateTemplate(props: PropsWithChildren) {
  const navigate = useNavigate();

  const { data } = useCustomQuery("me", fetchMe, {
    onError() {
      removeCookie("authToken");
      navigate("/auth");
      return false;
    },
  });
  const me = data?.data;

  return (
    <Flex
      flex={1}
      h="100vh"
      w="100%"
      flexDirection="column"
      position="relative"
    >
      <Header user={me} />
      <Flex flex={1} w="100%" position="absolute" top={pr(HEADER_HEIGHT)}>
        <Sidebar />
        <Flex
          flex={1}
          flexDirection="column"
          transition=".3s"
          p={{
            base: "3",
            lg: "5",
          }}
          ml={{
            base: 0,
            lg: pr(SIDEBAR_SMALL_WIDTH),
          }}
        >
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  );
}
