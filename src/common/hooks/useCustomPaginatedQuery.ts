import { useCallback, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

import { ApiErrorMessage } from "./../types/api.d";

export type Pagination = {
  search: string;
  page: number;
  limit: number;
};

export function useCustomPaginatedQuery<T>(
  queryKey: string,
  queryFn: (values: Pagination) => Promise<AxiosResponse<T>>,
  options?: UseQueryOptions<
    AxiosResponse<T>,
    AxiosError<{ message: ApiErrorMessage; status: number }>
  >
) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const data = useQuery<
    AxiosResponse<T>,
    AxiosError<{ message: ApiErrorMessage; status: number }>
  >(`${queryKey}`, () => queryFn({ limit, page, search }), options);

  const onSearch = useCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, []);

  const nextPage = useCallback(() => {
    setPage((state) => state + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((state) => state - 1);
  }, []);

  const totalCount = (data as any)?.data?.headers?.get?.("X-Total-Count")
    ? +(data as any).data.headers.get("X-Total-Count")
    : 0;

  const hasNext = totalCount > page * limit;
  const hasPrev = page > 1;

  useEffect(() => {
    data.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return {
    ...data,
    onSearch,
    nextPage,
    prevPage,
    page,
    limit,
    totalCount,
    hasNext,
    hasPrev,
  };
}
