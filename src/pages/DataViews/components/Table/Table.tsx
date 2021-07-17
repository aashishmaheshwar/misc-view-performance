import React, { useEffect } from "react";
import { useFetch } from "hooks";
import { useDispatch } from "react-redux";
import { ResponsiveTable } from "reusable_components";

const ColumnInfo = [
  { key: "id", label: "Id" },
  { key: "postId", label: "Post Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "body", label: "Body" },
];

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
    <ResponsiveTable
      label="Comments from Placeholder API"
      columnInfo={ColumnInfo}
      data={response || []}
    />
  );
};

export default Table;
