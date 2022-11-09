import { ILoginResponse, ILoginVariables, IUser } from "@common/types/api";
import { getCookie } from "@common/utils/cookies";
import { axiosClient } from "@services/client/config";

// GET
export async function fetchMe() {
  const token = getCookie("authToken");

  return await axiosClient.get<IUser>("/me", {
    headers: {
      authorization: "Bearer " + token,
    },
  });
}

// POST
export async function postLogin(variables: ILoginVariables) {
  return await axiosClient.post<ILoginResponse>("/auth/login", variables);
}
