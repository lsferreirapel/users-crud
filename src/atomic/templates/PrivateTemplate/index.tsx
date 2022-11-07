import React, { PropsWithChildren } from "react";

import { Box } from "@chakra-ui/react";
import { useCustomQuery } from "@common/hooks/useCustomQuery";
import { removeCookie } from "@common/utils/cookies";
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

  return <Box>{props.children}</Box>;
}
