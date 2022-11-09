import React, { useState } from "react";

import { Title } from "@atomic/atoms/Title";
import { DataTable } from "@atomic/molecules/DataTable";
import { UserForm } from "@atomic/organisms/Forms/UserForm";
import { IUsersFormValues } from "@atomic/organisms/Forms/UserForm/schemaUsers";
import { PrivateTemplate } from "@atomic/templates/PrivateTemplate";
import { useDisclosure } from "@chakra-ui/react";
import { useCustomMutation } from "@common/hooks/useCustomMutation";
import { useCustomPaginatedQuery } from "@common/hooks/useCustomPaginatedQuery";
import { IUser } from "@common/types/api";
import { formatCpf, formatDate, formatRole } from "@common/utils/format";
import {
  handleAPIErrorWithToast,
  handleSuccessToast,
  handleWarningToast,
} from "@common/utils/toast";
import { getUniqueValues, isEmpty, sanitizeString } from "@common/utils/utils";
import { useAuth } from "@services/auth/AuthContext";
import { queryClient } from "@services/client/config";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "@services/users";
import { createColumnHelper } from "@tanstack/react-table";
import { parseISO } from "date-fns";
import { debounce } from "debounce";
import { useNavigate } from "react-router-dom";

type UserToTable = IUser & {
  name: string;
  isAdmin: boolean;
};

export function UsersPage() {
  const { me } = useAuth();
  const navigate = useNavigate();

  const [defaultValues, setDefaultValues] =
    useState<Partial<IUsersFormValues>>();
  const formType = !!defaultValues ? "EDIT" : "CREATE";

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      setDefaultValues(undefined);
    },
  });

  const {
    data: usersData,
    onSearch,
    page,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  } = useCustomPaginatedQuery<IUser[]>("users", fetchUsers);

  const { mutate: createUserMutation } = useCustomMutation(createUser, {
    onError(error) {
      handleAPIErrorWithToast(error);
    },
    onSuccess() {
      queryClient.resetQueries("users");
      handleSuccessToast("Usuário criado com sucesso!.");
    },
  });

  const { mutate: updateUserMutation } = useCustomMutation(updateUser, {
    onError(error) {
      handleAPIErrorWithToast(error);
    },
    onSuccess() {
      queryClient.resetQueries("users");
      handleSuccessToast("Usuário atualizado com sucesso!.");
    },
  });

  const { mutate: deleteUserMutation } = useCustomMutation(deleteUser, {
    onError(error) {
      handleAPIErrorWithToast(error);
    },
    onSuccess() {
      queryClient.resetQueries("users");
      handleSuccessToast("Usuário deletado com sucesso!.");
    },
  });

  const data: UserToTable[] =
    usersData?.data?.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      isAdmin: user?.role === "ADMIN",
      ...user,
    })) ?? [];

  const columnHelper = createColumnHelper<UserToTable>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelper.accessor("document", {
      cell: (info) => formatCpf(info.getValue()),
      header: "Documento",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("birthDate", {
      cell: (info) => formatDate(info.getValue()),
      header: "Data de nascimento",
      meta: {
        isDate: true,
      },
    }),
    columnHelper.accessor("role", {
      cell: (info) => formatRole(info.getValue()),
      header: "Cargo",
    }),
  ];

  return (
    <PrivateTemplate>
      <Title
        text="usuário"
        addButtonProps={{
          isDisabled: me?.role !== "ADMIN",
          onClick: me?.role === "ADMIN" ? onOpen : undefined,
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        disableMoreOptions={me?.role !== "ADMIN"}
        paginationProps={{
          page,
          nextPage,
          prevPage,
          hasNext,
          hasPrev,
        }}
        searchProps={{
          onChange: debounce(
            (e: any) => onSearch(e?.target?.value?.trim()),
            500
          ),
        }}
        onEdit={(values) => {
          if (me?.id === values?.id) {
            navigate("/private/profile");
          }
          setDefaultValues({
            ...values,
            birthDate: parseISO(values.birthDate),
          });
          onOpen();
        }}
        onDelete={(values) => {
          if (!!values?.id && me?.id !== values?.id) {
            deleteUserMutation(values.id);
          }
          if (me?.id === values?.id) {
            handleWarningToast(
              "Você está tentando deletar seu próprio usuário."
            );
          }
        }}
      />
      <UserForm
        isOpen={isOpen}
        onClose={onClose}
        type={formType}
        title={`${formType === "EDIT" ? "Editar" : "Adicionar"} usuário`}
        defaultValues={defaultValues}
        onSubmit={(values) => {
          const id = values?.id ?? 0;
          delete values?.id;

          if (!!values?.birthDate)
            (values as any).birthDate = values.birthDate.toISOString();

          if (formType === "EDIT" && !!defaultValues) {
            delete (values as any).password;
            const update = getUniqueValues(values, defaultValues);

            if (isEmpty(update)) return;

            if (update.isAdmin !== undefined) {
              if (update.isAdmin) (update as any).role = "ADMIN";
              else (update as any).role = "USER";
            }

            return updateUserMutation({
              id,
              update: update as any,
            });
          }
          createUserMutation({
            ...values,
            document: sanitizeString(values.document) ?? "",
            role: values?.isAdmin ? "ADMIN" : "USER",
          } as any);
        }}
      />
    </PrivateTemplate>
  );
}
