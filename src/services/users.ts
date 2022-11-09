import { Pagination } from "@common/hooks/useCustomPaginatedQuery";
import {
  ICreateUserResponse,
  ICreateUserVariables,
  IUpdateUserResponse,
  IUpdateUserVariables,
  IUser,
} from "@common/types/api";
import { getCookie } from "@common/utils/cookies";
import { objectToURLParams } from "@common/utils/utils";

import { axiosClient } from "./client/config";

// GET
/**
 *  Get one user by ID
 */
export async function fetchUser(id: number) {
  const token = getCookie("authToken");

  return await axiosClient.get<IUser>("/users/" + id, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
}

/**
 *  Get all users
 */
export async function fetchUsers({
  page = 1,
  limit = 10,
  search = " ",
}: Pagination) {
  const token = getCookie("authToken");

  const params = objectToURLParams({
    q: search,
    _page: page,
    _limit: limit,
  });

  return await axiosClient.get<IUser[]>(`/users?${params}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
}

// POST

/**
 *  Create one user. This request is private, only ADMIN can access it
 */
export async function createUser(variables: ICreateUserVariables) {
  const token = getCookie("authToken");

  return await axiosClient.post<ICreateUserResponse>("/users", variables, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
}

// PATCH
/**
 *  Update one user. This request is private, only ADMIN can access it
 */
export async function updateUser(variables: IUpdateUserVariables) {
  const token = getCookie("authToken");

  return await axiosClient.patch<IUpdateUserResponse>(
    `/users/${variables.id}`,
    variables.update,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
}

// Delete
/**
 *  Delete one user. This request is private, only ADMIN can access it
 */
export async function deleteUser(id: number) {
  const token = getCookie("authToken");

  return await axiosClient.delete<Record<string, never>>(`/users/${id}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
}
