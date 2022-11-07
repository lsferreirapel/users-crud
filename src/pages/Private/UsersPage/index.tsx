import React from "react";

import { PrivateTemplate } from "@atomic/templates/PrivateTemplate";
import { Button, Text } from "@chakra-ui/react";
import { useAuth } from "@services/auth/AuthContext";

export function UsersPage() {
  const { logout } = useAuth();

  return (
    <PrivateTemplate>
      <Text>UsersPage</Text>
      <Button onClick={logout}>Logout</Button>
    </PrivateTemplate>
  );
}
