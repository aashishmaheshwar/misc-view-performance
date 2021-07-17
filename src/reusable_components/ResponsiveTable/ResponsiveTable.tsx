import {
  Box,
  Heading,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table as ChakraTable,
} from "@chakra-ui/react";
import { responsiveTableStyles } from "./ResponsiveTableStyles";
import React, { memo } from "react";

interface ResponsiveTableProps {
  columnInfo: Array<{ key: string; label: string }>;
  data?: Array<any>;
  responsiveAt?: string;
  label: string;
}

const ResponsiveTable = ({
  columnInfo,
  data = [],
  responsiveAt = "925px",
  label,
}: ResponsiveTableProps) => {
  return (
    <>
      <Heading size="sm" mt="8" mb="8">
        {label}
      </Heading>
      <Box overflowX="auto" w="95vw" css={responsiveTableStyles(responsiveAt)}>
        <ChakraTable
          aria-label={label}
          colorScheme="gray"
          variant="striped"
          className="table"
        >
          <Thead>
            <Tr>
              {columnInfo.map(({ label }) => (
                <Th key={label}>{label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                {columnInfo
                  .map(({ key }) => key)
                  .map((property, index) => (
                    <Td key={property} data-label={columnInfo[index].label}>
                      {item[property]}
                    </Td>
                  ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </Box>
    </>
  );
};

export default memo(ResponsiveTable);
