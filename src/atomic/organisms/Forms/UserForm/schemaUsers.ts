import { sanitizeString } from "@common/utils/utils";
import { validateCPF } from "@common/utils/validate";
import { Yup } from "@common/utils/yup";

export interface IUsersFormValues {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  document: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const schemaUsersCreate = Yup.object().shape({
  firstName: Yup.string().label("Nome").trim().required().min(3),
  lastName: Yup.string().label("Sobrenome").trim().required().min(3),
  birthDate: Yup.date().label("Data de nascimento").required(),
  document: Yup.string()
    .label("CPF")
    .test("CPF válido", "CPF não é válido.", (value) =>
      validateCPF(sanitizeString(value ?? ""))
    )
    .required(),
  email: Yup.string().label("Email").trim().email().required(),
  password: Yup.string().label("Senha").trim().required().min(6),
  isAdmin: Yup.boolean().required(),
});

export const schemaUsersEdit = Yup.object().shape({
  firstName: Yup.string().label("Nome").trim().required().min(3),
  lastName: Yup.string().label("Sobrenome").trim().required().min(3),
  birthDate: Yup.date().label("Data de nascimento").required(),
  document: Yup.string()
    .label("CPF")
    .test("CPF válido", "CPF não é válido.", (value) =>
      validateCPF(sanitizeString(value ?? ""))
    )
    .required(),
  email: Yup.string().label("Email").trim().email().required(),
  password: Yup.string().label("Senha").trim().optional().nullable(),
  isAdmin: Yup.boolean().required(),
});
