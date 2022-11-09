import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";

import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";
import { useController } from "react-hook-form";

type UploadFieldProps = {
  name: string;
  label: string;
  acceptedFileTypes?: InputHTMLAttributes<HTMLInputElement>["accept"];
} & FormControlProps;

export function UploadField({
  name,
  label = "Selecione uma imagem",
  acceptedFileTypes = "image/png, image/jpeg",
  ...props
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>();
  const [file, setFile] = useState<File & { preview: string; id: string }>();

  const {
    field: { value, onChange, ...fieldProps },
    fieldState: { error, isTouched },
  } = useController({
    name,
  });

  useEffect(() => {
    onChange(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <FormControl mb="2" {...props} id={name} isInvalid={!!(isTouched && error)}>
      <InputGroup>
        <input
          type="file"
          accept={acceptedFileTypes}
          {...fieldProps}
          onChange={(event) => {
            const file = event?.currentTarget?.files?.[0];

            if (file) {
              setFile(
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                  id: Math.floor(Math.random() * 5000) + file.name,
                })
              );
            }
          }}
          ref={inputRef as any}
          style={{ display: "none" }}
        />
        <Flex>
          <Image
            src={value?.preview}
            boxSize={pr(100)}
            borderRadius="lg"
            objectFit="cover"
            fallback={<Box boxSize={pr(100)} bg="gray.300" borderRadius="lg" />}
          />
          <Flex flexDirection="column" justifyContent="space-between" ml="2">
            {label && (
              <FormLabel>
                <Text textStyle="Headline.Bold" color="title">
                  {label}
                </Text>
              </FormLabel>
            )}
            <Flex flexDirection="column">
              {value?.name && (
                <Flex alignItems="center" justifyContent="flex-end">
                  <Text textStyle="Notification.Bold">{value?.name}</Text>
                  <IconButton
                    variant="ghost"
                    size="xs"
                    onClick={() => onChange(null)}
                    icon={<CloseIcon color="error" w={pr(8)} h={pr(8)} />}
                    aria-label="button"
                  />
                </Flex>
              )}
              <Button onClick={() => inputRef?.current?.click?.()} mt="px">
                Escolher arquivo{" "}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </InputGroup>
      <FormErrorMessage as="span" mt="1">
        {error?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
