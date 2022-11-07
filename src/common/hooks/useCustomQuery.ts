import { AxiosError, AxiosResponse } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ApiErrorMessage } from "./../types/api.d";

export function useCustomQuery<T>(
  queryKey: string,
  queryFn: QueryFunction<AxiosResponse<T>>,
  options?: UseQueryOptions<
    AxiosResponse<T>,
    AxiosError<{ message: ApiErrorMessage; status: number }>
  >
) {
  return useQuery<
    AxiosResponse<T>,
    AxiosError<{ message: ApiErrorMessage; status: number }>
  >(queryKey, queryFn, options);
}
