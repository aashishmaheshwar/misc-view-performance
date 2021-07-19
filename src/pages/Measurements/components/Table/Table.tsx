import React from "react";
import { Measurement } from "types";
import { useTable } from "react-table";

interface TableProps {
  data: Array<Measurement>;
}

const ColumnInfo: Array<{ Header: string; accessor: string }> = [
  { Header: "", accessor: "" },
];

const Table = ({ data }: TableProps) => {
  return <div>Table</div>;
};

export default Table;
