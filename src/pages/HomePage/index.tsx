import React from "react";

import { getCookie } from "@common/utils/cookies";
import { Navigate } from "react-router-dom";

export function HomePage() {
  const token = getCookie("authToken");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return <Navigate to="/private/users" replace />;
}
