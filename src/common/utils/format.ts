import { Role } from "@common/types/api";
import { format, parseISO } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

export function formatRole(role?: Role) {
  if (!role) return;

  const conversion = {
    ADMIN: "Administrador",
    USER: "Usuário",
  };

  return conversion[role];
}

export function formatDate(value: string) {
  if (!value) return;

  return format(parseISO(value), "dd/MM/yyyy", { locale: ptBr });
}

export function formatCpf(value: string) {
  return value
    ?.replace(/\D/g, "")
    ?.replace(/(\d{3})(\d)/, "$1.$2")
    ?.replace(/(\d{3})(\d)/, "$1.$2")
    ?.replace(/(\d{3})(\d{1,2})/, "$1-$2")
    ?.replace(/(-\d{2})\d+?$/, "$1");
}
