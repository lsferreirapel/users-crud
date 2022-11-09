import * as React from "react";

import { TableActions, TableActionsProps } from "@atomic/atoms/TableActions";
import {
  TablePagination,
  TablePaginationProps,
} from "@atomic/atoms/TablePagination";
import { Icon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  chakra,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Text,
} from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { MdSearch } from "react-icons/md";

export type DataTableProps<Data> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  onEdit?: TableActionsProps["onEdit"];
  onDelete?: TableActionsProps["onDelete"];
  searchProps?: InputProps;
  disableMoreOptions?: boolean;
  paginationProps?: TablePaginationProps;
};

export function DataTable<Data extends object>({
  data,
  columns,
  onEdit,
  onDelete,
  searchProps,
  disableMoreOptions,
  paginationProps,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Flex flex={1} alignItems="center" flexDirection="column">
      <Flex w="100%" direction="column" p="2" bg="background" borderRadius="lg">
        <InputGroup variant="outline" borderColor="transparent" my="2">
          <InputLeftElement pointerEvents="none">
            <Icon as={MdSearch} w={pr(18)} h={pr(18)} color="body2" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Persquisar usuários"
            bg="background2"
            {...searchProps}
          />
        </InputGroup>

        {/* Header */}
        <Flex w="100%" bg="background2" cursor="pointer">
          {table.getHeaderGroups().map((headerGroup) => (
            <Flex w="100%" key={headerGroup.id}>
              <Grid
                w="100%"
                gridTemplateColumns={`repeat(auto-fit, minmax(200px, 1fr))`}
                pt="2"
                px="2"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Flex
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      pb="2"
                    >
                      <Text textStyle="Headline.Bold" color="title">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Text>

                      <chakra.span pl="2" fontSize="md">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : (
                          <TriangleUpIcon
                            aria-label="sort disabled"
                            opacity={0}
                          />
                        )}
                      </chakra.span>
                    </Flex>
                  );
                })}
              </Grid>
              {!disableMoreOptions && <Box w="60px" />}
            </Flex>
          ))}
        </Flex>

        {/* Body */}
        <Flex flexDirection="column" border="none" w="100%">
          {table.getRowModel().rows.map((row) => {
            const values = row.original;

            return (
              <Flex w="100%" key={row.id}>
                <Grid
                  w="100%"
                  gridTemplateColumns={`repeat(auto-fit, minmax(200px, 1fr))`}
                  p="2"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Flex key={cell.id}>
                        <Text
                          textStyle="Headline.Regular"
                          color="title"
                          wordBreak="break-word"
                          w="90%"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Text>
                      </Flex>
                    );
                  })}
                </Grid>
                {!disableMoreOptions && (
                  <Center w="60px">
                    <TableActions
                      value={values}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </Center>
                )}
              </Flex>
            );
          })}
        </Flex>
        {paginationProps && <TablePagination {...paginationProps} />}
      </Flex>
    </Flex>
  );
}
