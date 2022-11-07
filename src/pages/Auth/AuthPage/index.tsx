import React from "react";

import { AuthTemplate } from "@atomic/templates/AuthTemplate";

import { LoginPage } from "../LoginPage";

export function AuthPage() {
  return <AuthTemplate loginPage={<LoginPage />} />;
}
