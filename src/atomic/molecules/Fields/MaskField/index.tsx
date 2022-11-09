import React from "react";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

export type MaskFieldProps = {
  name: string;
  label: string;
  mask: InputMaskProps["mask"];
  maskPlaceholder?: InputMaskProps["maskPlaceholder"];
  alwaysShowMask?: InputMaskProps["alwaysShowMask"];
  beforeMaskedStateChange?: InputMaskProps["beforeMaskedStateChange"];
  placeholder?: string;
} & FormControlProps;

export function MaskField({
  name,
  label,
  mask,
  maskPlaceholder,
  alwaysShowMask,
  beforeMaskedStateChange,
  placeholder,
  ...props
}: MaskFieldProps) {
  const {
    field,
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
        {...field}
        as={InputMask}
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        alwaysShowMask={alwaysShowMask}
        beforeMaskedStateChange={beforeMaskedStateChange}
        fontSize="lg"
        fontWeight="regural"
        color="body2"
        p="3"
        borderRadius="lg"
        placeholder={placeholder}
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
