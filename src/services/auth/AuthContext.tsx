import React, { PropsWithChildren } from "react";
import { createContext, useCallback, useContext } from "react";

import { useCustomMutation } from "@common/hooks/useCustomMutation";
import { ILoginResponse, ILoginVariables } from "@common/types/api";
import { queryClient } from "@services/client/config";
import { removeCookie, setCookie } from "@src/common/utils/cookies";
import {
  handleAPIErrorWithToast,
  handleSuccessToast,
} from "@src/common/utils/toast";
import { useNavigate } from "react-router-dom";

import { postLogin } from "./auth";

type AuthContextType = {
  login(props: ILoginVariables): Promise<void>;
  isLoading?: boolean;
  logout(): void;
};

const AuthContext = createContext<AuthContextType>({
  login: async () => undefined,
  isLoading: false,
  logout: () => undefined,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const { mutate: loginMutation, isLoading } = useCustomMutation<
    ILoginResponse,
    ILoginVariables
  >(postLogin, {
    onError(error) {
      handleAPIErrorWithToast(error);
    },
    onSuccess(response) {
      setCookie("authToken", response.data.access_token);
      queryClient.resetQueries("me");
      handleSuccessToast("Login realizado com sucesso.");
      navigate("/private/users");
    },
  });

  const login = useCallback(
    async (variables: ILoginVariables) => {
      loginMutation(variables);
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    removeCookie("authToken");
    queryClient.invalidateQueries("me");
    navigate("/");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
