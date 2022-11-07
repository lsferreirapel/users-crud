import { ApiErrorMessage } from "@common/types/api";
import { AxiosError, AxiosResponse } from "axios";
import { MutationFunction, useMutation, UseMutationOptions } from "react-query";

export function useCustomMutation<TData, TVariables>(
  mutationFn: MutationFunction<AxiosResponse<TData>, TVariables>,
  options?: UseMutationOptions<
    AxiosResponse<TData>,
    AxiosError<{ message: ApiErrorMessage; status: number }>,
    TVariables
  >
) {
  return useMutation<
    AxiosResponse<TData>,
    AxiosError<{ message: ApiErrorMessage; status: number }>,
    TVariables
  >(mutationFn, options);
}
