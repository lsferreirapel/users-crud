import React, { useEffect } from "react";

import { CustomDrawerProps, Drawer } from "@atomic/molecules/Drawer";
import { CheckboxField } from "@atomic/molecules/Fields/CheckboxField";
import { DateField } from "@atomic/molecules/Fields/DateField";
import { MaskField } from "@atomic/molecules/Fields/MaskField";
import { TextField } from "@atomic/molecules/Fields/TextField";
import { Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import {
  IUsersFormValues,
  schemaUsersCreate,
  schemaUsersEdit,
} from "./schemaUsers";

type UserFormProps = {
  onSubmit: (values: IUsersFormValues) => void | Promise<void>;
  defaultValues?: Partial<IUsersFormValues>;
  type?: "EDIT" | "CREATE";
} & Omit<CustomDrawerProps, "children">;

export function UserForm({
  onSubmit,
  defaultValues,
  type = "CREATE",
  ...props
}: UserFormProps) {
  const form = useForm<IUsersFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: new Date(),
      document: "",
      email: "",
      password: "",
      isAdmin: false,
    },
    resolver: yupResolver(
      type === "EDIT" ? schemaUsersEdit : schemaUsersCreate
    ),
    mode: "onTouched",
  });

  function handleOnClose() {
    form.reset();
    props?.onClose();
  }

  useEffect(() => {
    form.reset(defaultValues, { keepDefaultValues: true });
  }, [defaultValues, form]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      handleOnClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Drawer
      size="lg"
      {...props}
      onClose={handleOnClose}
      submitButtonProps={{
        onClick: form.handleSubmit(onSubmit),
        isLoading: form.formState.isSubmitting,
        disabled: form.formState.isSubmitting || !form.formState.isValid,
      }}
    >
      <FormProvider {...form}>
        <Flex gap="2">
          <TextField
            name="firstName"
            label="Nome"
            placeholder="Digite seu nome aqui"
            isRequired={type === "CREATE"}
          />
          <TextField
            name="lastName"
            label="Sobrenome"
            placeholder="Digite seu sobrenome aqui"
            isRequired={type === "CREATE"}
          />
        </Flex>
        <MaskField
          name="document"
          label="CPF"
          mask="999.999.999-99"
          alwaysShowMask
          placeholder="Digite seu cpf aqui"
          isRequired={type === "CREATE"}
        />
        <TextField
          name="email"
          label="Email"
          placeholder="Digite seu email aqui"
          isRequired={type === "CREATE"}
        />
        <TextField
          isDisabled={type === "EDIT"}
          name="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha aqui"
          isRequired={type === "CREATE"}
        />
        <DateField
          name="birthDate"
          label="Data de nascimento"
          isRequired={type === "CREATE"}
        />
        <CheckboxField name="isAdmin" label="Administrador" />
      </FormProvider>
    </Drawer>
  );
}
