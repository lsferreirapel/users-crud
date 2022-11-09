export type Role = "USER" | "ADMIN";

export type ApiErrorMessage =
  | "ACCESS_TOKEN_NOT_PROVIDED"
  | "REVOKED_ACCESS_TOKEN"
  | "INVALID_AUTHORIZATION_FORMAT"
  | "INVALID_CREDENTIALS"
  | "FORBIDDEN_RESOURCE";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  role: Role;
}

// GET - /auth/login
export interface ILoginVariables {
  email: string;
  password: string;
}
export interface ILoginResponse {
  access_token: string;
}

// POST - /users
export type ICreateUserVariables = { password: string } & Omit<IUser, "id">;
export type ICreateUserResponse = IUser;

// PUT - /users/:id
export type IUpdateUserVariables = {
  id: IUser["id"];
  update: Partial<ICreateUserVariables>;
};
export type IUpdateUserResponse = IUser;
