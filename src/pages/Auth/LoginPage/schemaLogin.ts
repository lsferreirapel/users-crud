import { Yup } from "@common/utils/yup";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const schemaLogin = Yup.object().shape({
  email: Yup.string().label("email").email().trim().required(),
  password: Yup.string().label("senha").trim().required(),
});
