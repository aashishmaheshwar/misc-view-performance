import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  useMediaQuery,
  Text,
  VStack,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { useFetch, useUtilityFns } from "hooks";
import { Comment } from "pages/DataViews";
import { useDispatch } from "react-redux";
import { GroupedDataType } from "../GroupedTable/GroupedTable";
import Tile from "./components/Tile/Tile";

const Tiles = () => {
  const { response, error, isLoading, fetchDuration } = useFetch();
  const dispatch = useDispatch();
  const [data, setData] = useState<GroupedDataType>([]);
  const { groupByPostId } = useUtilityFns();
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

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
        Comments Tiles from Placeholder API
      </Heading>
      <Box overflowX="auto" w="95vw">
        <Text>
          {isLargerThan900 ? "larger than 900px" : "smaller than 900px"}
        </Text>
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
