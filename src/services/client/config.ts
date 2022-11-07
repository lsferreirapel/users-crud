import axios from "axios";
import { QueryClient } from "react-query";

const baseURL = "http://localhost:4000";

export const axiosClient = axios.create({
  baseURL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      // rentry: false,
    },
  },
});
