import React from "react";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";
import { useController } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type TextFieldProps = {
  name: string;
  label: string;
  type?: "text" | "password";
  placeholder?: string;
} & FormControlProps;

export function TextField({
  name,
  label,
  type = "text",
  placeholder,
  ...props
}: TextFieldProps) {
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({
    name,
  });

  const [showPassword, setShowPassword] = useBoolean();

  return (
    <FormControl
      isRequired={true}
      mb="4"
      {...props}
      id={name}
      isInvalid={!!(isTouched && error)}
    >
      {label && (
        <FormLabel ml="2" mb="1" display="flex">
          <Text textStyle="Headline.Bold" color="title">
            {label}
          </Text>
        </FormLabel>
      )}
      {type === "password" ? (
        <InputGroup>
          <Input
            {...field}
            fontSize="lg"
            fontWeight="regural"
            color="body2"
            p="3"
            borderRadius="lg"
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            borderColor="primary.500"
            _hover={{
              borderColor: "primary.700",
            }}
          />
          <InputRightElement onClick={setShowPassword.toggle} m="0.5">
            {showPassword ? (
              <Icon as={BsEye} w={pr(22)} h={pr(22)} color="body1" />
            ) : (
              <Icon as={BsEyeSlash} w={pr(22)} h={pr(22)} color="body1" />
            )}
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          {...field}
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
      )}
      <FormErrorMessage as="span" mt="1">
        {error?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
