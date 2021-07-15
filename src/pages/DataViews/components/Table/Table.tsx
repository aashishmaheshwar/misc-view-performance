import React from "react";
import {
  Table as ChakraTable,
  TableCaption,
  Td,
  Tr,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import { useFetch } from "../../../../hooks/useFetch";
import { Comment } from "../../DataViews";

const Table = () => {
  const { response, error, isLoading, fetchDuration } = useFetch();

  if (isLoading) {
    return "Fetching table data";
  }

  if (error) {
    return "Unable to fetch data";
  }

  return (
    <ChakraTable>
      <TableCaption placement="top">Comments from Placeholder API</TableCaption>
      <Thead>
        <Tr>
          <Td>Id</Td>
          <Td>Post Id</Td>
          <Td>Name</Td>
          <Td>Email</Td>
          <Td>Body</Td>
        </Tr>
      </Thead>
      <Tbody>
        {((response || []) as Array<Comment>).map((item) => (
          <Tr key={item.id}>
            {["id", "postId", "name", "email", "body"].map((property) => (
              <Td key={property}>{item[property as keyof Comment]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;
