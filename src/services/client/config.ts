import axios from "axios";
import { QueryClient } from "react-query";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
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
