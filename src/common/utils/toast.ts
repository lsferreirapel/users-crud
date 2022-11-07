import { createStandaloneToast } from "@chakra-ui/react";
import { apiErrorsMessages } from "@common/errors/messages";
import { theme } from "@common/theme";
import { ApiErrorMessage } from "@common/types/api";
import { AxiosError } from "axios";

export const { ToastContainer, toast } = createStandaloneToast({ theme });

export function handleAPIErrorWithToast(
  error: AxiosError<{
    message: ApiErrorMessage;
    status: number;
  }>
) {
  const message = apiErrorsMessages[error?.response?.data?.message ?? ""];

  console.log("API ERROR MESSAGE: ", error?.response?.data?.message);

  toast({
    title: message ? "Ocorreu um erro!" : "Erro!",
    description: message ? message : "Ocorreu um erro",
    status: "error",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
}

export function handleSuccessToast(message: string, title?: string) {
  toast({
    title: title ? title : "Sucesso!",
    description: message,
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
}

export function handleWarningToast(message: string, title?: string) {
  toast({
    title: title ? title : "Cuidado!",
    description: message,
    status: "warning",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
}
