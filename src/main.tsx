import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "@common/utils/toast";
import { AuthProvider } from "@services/auth/AuthContext";
import { queryClient } from "@services/client/config";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { theme } from "./common/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <ToastContainer />
        </QueryClientProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
