import "react-datepicker/dist/react-datepicker.css";

import React from "react";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import ptBR from "date-fns/locale/pt-BR";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";
import { useController } from "react-hook-form";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

type DateFieldProps = {
  name: string;
  label: string;
} & FormControlProps;

export function DateField({ name, label, ...props }: DateFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error, isTouched },
  } = useController({
    name,
  });
  return (
    <FormControl mb="2" {...props} id={name} isInvalid={!!(isTouched && error)}>
      {label && (
        <FormLabel ml="2" mb="1" display="flex">
          <Text textStyle="Headline.Bold" color="title">
            {label}
          </Text>
        </FormLabel>
      )}

      <Input
        as={ReactDatePicker}
        dateFormat="dd/MM/yyyy"
        selected={value}
        showPopperArrow={false}
        showYearDropdown
        onChange={onChange}
        onBlur={onBlur}
        fontSize="lg"
        fontWeight="regural"
        color="body2"
        p="3"
        cursor="pointer"
        borderRadius="lg"
        borderColor="primary.500"
        _hover={{
          borderColor: "primary.700",
        }}
      />

      <FormErrorMessage as="span" mt="1">
        {error?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
