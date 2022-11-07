import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
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
        </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
