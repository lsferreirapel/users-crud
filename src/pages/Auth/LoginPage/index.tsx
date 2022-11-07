import React from "react";

import { TextField } from "@atomic/molecules/Fields/TextField";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@services/auth/AuthContext";
import { FormProvider, useForm } from "react-hook-form";

import { ILoginFormValues, schemaLogin } from "./schemaLogin";

export function LoginPage() {
  const { login, isLoading } = useAuth();

  const form = useForm<ILoginFormValues>({
    defaultValues: schemaLogin.cast({
      email: "lucas@gmail.com",
      password: "123456",
    }),
    resolver: yupResolver(schemaLogin),
    mode: "onTouched",
  });

  function onSubmit(values: ILoginFormValues) {
    login({
      ...values,
    });
  }

  return (
    <Box as="section">
      <FormProvider {...form}>
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
          mb="1"
        />
        <Link
          display="flex"
          justifyContent="flex-end"
          textStyle="Menu.2-Bold"
          color="body2"
          textAlign="end"
          mb="5"
        >
          Esqueci minha senha
        </Link>
        <Button
          w="100%"
          colorScheme="primary"
          type="submit"
          isLoading={form.formState.isSubmitting || isLoading}
          disabled={
            form.formState.isSubmitting || !form.formState.isValid || isLoading
          }
          onClick={form.handleSubmit(onSubmit)}
        >
          Entrar
        </Button>
        <Text
          textAlign="center"
          textStyle="Captions.Regular"
          color="body2"
          my="0.5"
        >
          Ou
        </Text>
        <Button w="100%" colorScheme="primary" variant="outline" disabled>
          Entrar com google
        </Button>
      </FormProvider>
    </Box>
  );
}
