import React, { useEffect, useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { useFetch, useUtilityFns } from "hooks";
import { useDispatch } from "react-redux";
import { GroupedDataType } from "../GroupedTable/GroupedTable";
import { Tile } from "./components/Tile";

const Tiles = () => {
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
    return <>Fetching tile data"</>;
  }

  if (error) {
    return <>Unable to fetch tile data</>;
  }

  return (
    <>
      <Heading size="sm" mt="8" mb="8">
        Comments Tiles from Placeholder API
      </Heading>
      <Box overflowX="auto" w="95vw">
        {data.map(({ postId, comments }) => (
          <Box key={postId} flexDirection="column" justifyContent="center">
            <Heading size="sm" mt="8" mb="8">
              Comments for Post ID {postId}
            </Heading>
            <Flex flexWrap="wrap" justifyContent="center">
              {comments.map((item, index) => (
                <Tile key={item.id} {...item} />
              ))}
              {comments.length % 2 && <Box w="400px" m="10px"></Box>}
            </Flex>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Tiles;
