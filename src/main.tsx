import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "@common/utils/toast";
import { queryClient } from "@services/client/config";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";

import App from "./App";
import { theme } from "./common/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
      <App />
          <ToastContainer />
        </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
