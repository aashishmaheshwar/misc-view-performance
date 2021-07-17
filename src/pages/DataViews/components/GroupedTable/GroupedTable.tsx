import { Heading, VStack } from "@chakra-ui/react";
import { useFetch, useUtilityFns } from "hooks";
import { GroupedDataType } from "types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ResponsiveTable } from "reusable_components";

const ColumnInfo = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "body", label: "Body" },
];

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
          <ResponsiveTable
            label={`Comments for Post ID ${postId}`}
            columnInfo={ColumnInfo}
            data={comments}
          />
        </VStack>
      ))}
    </>
  );
};

export default GroupedTable;
