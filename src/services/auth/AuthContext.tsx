import React, { PropsWithChildren } from "react";
import { createContext, useCallback, useContext } from "react";

import { useCustomMutation } from "@common/hooks/useCustomMutation";
import { useCustomQuery } from "@common/hooks/useCustomQuery";
import { ILoginVariables, IUser } from "@common/types/api";
import { queryClient } from "@services/client/config";
import { removeCookie, setCookie } from "@src/common/utils/cookies";
import {
  handleAPIErrorWithToast,
  handleSuccessToast,
} from "@src/common/utils/toast";
import { useNavigate } from "react-router-dom";

import { fetchMe, postLogin } from "./auth";

type AuthContextType = {
  login(props: ILoginVariables): Promise<void>;
  isLoading?: boolean;
  logout(): void;
  me?: IUser;
};

const AuthContext = createContext<AuthContextType>({
  login: async () => undefined,
  isLoading: false,
  logout: () => undefined,
  me: undefined,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const { data } = useCustomQuery("me", fetchMe);
  const me = data?.data;

  const { mutate: loginMutation, isLoading } = useCustomMutation(postLogin, {
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
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
