import React, { useEffect } from "react";
import {
  Table as ChakraTable,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useFetch } from "hooks";
import { Comment } from "pages/DataViews";
import { tableStyles } from "./TableSyles";
import { useDispatch } from "react-redux";

const Table = () => {
  const { response, error, isLoading, fetchDuration } = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchDuration) {
      dispatch({ type: "EMIT_FETCH_DURATION", payload: fetchDuration });
    }
  }, [fetchDuration, dispatch]);

  if (isLoading) {
    return <>Fetching table data"</>;
  }

  if (error) {
    return <>Unable to fetch data</>;
  }

  return (
    <>
      <Heading size="sm" mt="8" mb="8">
        Comments from Placeholder API
      </Heading>
      <Box overflowX="auto" w="95vw" css={tableStyles()}>
        <ChakraTable
          arai-label="Comments from Placeholder API"
          colorScheme="gray"
          variant="striped"
        >
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Post Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Body</Th>
            </Tr>
          </Thead>
          <Tbody>
            {((response || []) as Array<Comment>).map((item) => (
              <Tr key={item.id}>
                {(
                  ["id", "postId", "name", "email", "body"] as Array<
                    keyof Comment
                  >
                ).map((property) => (
                  <Td key={property}>{item[property]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </Box>
    </>
  );
};

export default Table;
