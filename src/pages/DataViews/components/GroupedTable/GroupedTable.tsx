import {
  Box,
  Heading,
  VStack,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useFetch, useUtilityFns } from "hooks";
import { Comment } from "pages/DataViews/DataViews";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tableStyles } from "../Table/TableSyles";

export type GroupedDataType = Array<{ postId: string; comments: Comment[] }>;

const GroupedTable = () => {
  const { response, error, isLoading, fetchDuration } = useFetch();
  const dispatch = useDispatch();
  const [data, setData] = useState<GroupedDataType>([]);
  const { groupByPostId } = useUtilityFns();

  useEffect(() => {
    if (response) {
      setData(groupByPostId(response as any));
    }
  }, [response, groupByPostId]);

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
        Comments grouped by Post ID from Placeholder API
      </Heading>
      {data.map(({ postId, comments }) => (
        <VStack key={postId}>
          <Heading size="sm" mt="8" mb="8" textAlign="left">
            Comments for Post ID {postId}
          </Heading>
          <Box overflowX="auto" w="95vw" css={tableStyles()}>
            <ChakraTable
              arai-label={`Comments for Post ID ${postId}`}
              colorScheme="gray"
              variant="striped"
            >
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Body</Th>
                </Tr>
              </Thead>
              <Tbody>
                {comments.map((item) => (
                  <Tr key={item.id}>
                    {(
                      ["id", "name", "email", "body"] as Array<keyof Comment>
                    ).map((property) => (
                      <Td key={property}>{item[property]}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </ChakraTable>
          </Box>
        </VStack>
      ))}
    </>
  );
};

export default GroupedTable;
