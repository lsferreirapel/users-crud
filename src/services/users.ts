import { IUser } from "@common/types/api";

import { axiosClient } from "./client/config";

// GET
export async function fetchUsers() {
  return await axiosClient.get<IUser[]>("/users");
}

// POST
// export function updateUser() {
//   axiosClient.pos
// }
