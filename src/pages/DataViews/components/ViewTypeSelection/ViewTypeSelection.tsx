import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { ViewType } from "../../DataViews";

interface Props {
  viewType: ViewType;
  onChange: any;
}

const ViewTypeSelection = ({ viewType, onChange }: Props) => {
  const handleChange = (type: ViewType) => () => {
    onChange(type);
  };

  return (
    <HStack marginLeft="auto">
      <Button
        variant={viewType === "table" ? "solid" : "outline"}
        onClick={handleChange("table")}
      >
        Table
      </Button>
      <Button
        variant={viewType === "grouped table" ? "solid" : "outline"}
        onClick={handleChange("grouped table")}
      >
        Grouped Table
      </Button>
      <Button
        variant={viewType === "tiles" ? "solid" : "outline"}
        onClick={handleChange("tiles")}
      >
        Tiles
      </Button>
    </HStack>
  );
};

export default ViewTypeSelection;
