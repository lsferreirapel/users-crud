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
  password: string;
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
