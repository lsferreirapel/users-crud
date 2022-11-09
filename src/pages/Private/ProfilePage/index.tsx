import React, { useEffect, useMemo } from "react";

import { DateField } from "@atomic/molecules/Fields/DateField";
import { MaskField } from "@atomic/molecules/Fields/MaskField";
import { TextField } from "@atomic/molecules/Fields/TextField";
import { UploadField } from "@atomic/molecules/Fields/UploadField";
import { PrivateTemplate } from "@atomic/templates/PrivateTemplate";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useCustomMutation } from "@common/hooks/useCustomMutation";
import {
  handleAPIErrorWithToast,
  handleSuccessToast,
} from "@common/utils/toast";
import { getUniqueValues, isEmpty } from "@common/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@services/auth/AuthContext";
import { queryClient } from "@services/client/config";
import { updateUser } from "@services/users";
import { parseISO } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";

import { IProfileFormValues, schemaProfile } from "./schemaProfile";

export function ProfilePage() {
  const { me } = useAuth();

  const { mutate: updateUserMutation } = useCustomMutation(updateUser, {
    onError(error) {
      handleAPIErrorWithToast(error);
    },
    onSuccess() {
      queryClient.resetQueries("me");
      queryClient.resetQueries("users");
      handleSuccessToast("Usuário atualizado com sucesso!.");
    },
  });

  const defaultValues = useMemo(
    () => ({
      id: me?.id ?? 0,
      firstName: me?.firstName ?? "",
      lastName: me?.lastName ?? "",
      birthDate: me?.birthDate ? parseISO(me?.birthDate) : new Date(),
      document: me?.document ?? "",
      email: me?.email ?? "",
      password: undefined,
    }),
    [me]
  );

  const form = useForm<IProfileFormValues>({
    defaultValues,
    resolver: yupResolver(schemaProfile),
    mode: "onTouched",
  });

  useEffect(() => {
    form.reset(defaultValues, { keepDefaultValues: true });
  }, [defaultValues, form]);

  return (
    <PrivateTemplate>
      <Text
        color="title"
        textStyle="Heading.H5-Bold"
        textTransform="capitalize"
        mb="4"
      >
        Meu Perfil
      </Text>
      <Flex
        flex={1}
        p="2"
        borderRadius="lg"
        flexDirection="column"
        bg="background"
      >
        <FormProvider {...form}>
          <TextField
            name="id"
            label="ID"
            placeholder="Digite seu nome aqui"
            isDisabled
            mb="3"
          />
          <UploadField name="avatar" label="Selecione uma foto de perfil" />
          <Flex gap="2">
            <TextField
              name="firstName"
              label="Nome"
              placeholder="Digite seu nome aqui"
            />
            <TextField
              name="lastName"
              label="Sobrenome"
              placeholder="Digite seu sobrenome aqui"
            />
          </Flex>
          <DateField name="birthDate" label="Data de nascimento" />
          <MaskField
            name="document"
            label="CPF"
            mask="999.999.999-99"
            alwaysShowMask
            placeholder="Digite seu cpf aqui"
          />
          <TextField
            name="email"
            label="Email"
            placeholder="Digite seu email aqui"
          />
          <TextField
            name="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha aqui"
          />
        </FormProvider>
      </Flex>
      <Flex my="2" gap="2">
        <Button
          size="lg"
          colorScheme="primary"
          isLoading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          onClick={form.handleSubmit((values) => {
            const update = getUniqueValues(values, defaultValues);

            if (isEmpty(update)) return;
            if (!!update.birthDate)
              (update as any).birthDate = update.birthDate.toISOString();

            updateUserMutation({
              id: values.id,
              update: update as any,
            });
          })}
        >
          Salvar
        </Button>
      </Flex>
    </PrivateTemplate>
  );
}
