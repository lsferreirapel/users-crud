import React from "react";

import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { pr } from "@common/utils/ptToRem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type TablePaginationProps = {
  nextPage?: () => void;
  prevPage?: () => void;
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalCount?: number;
};

export function TablePagination(props: TablePaginationProps) {
  return (
    <Flex alignItems="center">
      <IconButton
        isDisabled={!props?.hasPrev}
        icon={<Icon as={FaChevronLeft} w={pr(15)} h={pr(15)} />}
        aria-label="previous page button"
        onClick={props?.prevPage}
      />
      <Text textStyle="Headline.Bold" mx="2">
        {props?.page}
      </Text>
      <IconButton
        isDisabled={!props?.hasNext}
        icon={<Icon as={FaChevronRight} w={pr(15)} h={pr(15)} />}
        aria-label="next page button"
        onClick={props?.nextPage}
      />
    </Flex>
  );
}
