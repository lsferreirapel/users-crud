import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlProps,
  Text,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";

type CheckboxFieldProps = {
  name: string;
  label: string;
} & FormControlProps;

export function CheckboxField({ name, label, ...props }: CheckboxFieldProps) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error, isTouched },
  } = useController({
    name,
  });

  return (
    <FormControl {...props} id={name} isInvalid={!!(isTouched && error)}>
      <Checkbox
        isChecked={value}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        isInvalid={!!(isTouched && error)}
        colorScheme="primary"
      >
        <Text textStyle="Body.2-Semibold">{label}</Text>
      </Checkbox>
    </FormControl>
  );
}
