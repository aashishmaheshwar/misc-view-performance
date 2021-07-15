import React, { useState, Profiler } from "react";
import { Heading, Button, Flex, Box } from "@chakra-ui/react";
import { viewTypeContainerStyles } from "./DataViewsStyles";
import ViewTypeSelection from "./components/ViewTypeSelection";

export type ViewType = "table" | "grouped table" | "tiles";

const DataViews = () => {
  const [viewType, setViewType] = useState<ViewType>("table");
  const [started, setStarted] = useState(false);

  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type);
  };

  const buildViewContainer = () => {
    return null;
  };

  return (
    <Box css={viewTypeContainerStyles()}>
      <Heading alignSelf="center" fontWeight="extrabold" size="lg">
        Data Views
      </Heading>
      <Flex className="view-type-container" mt="8">
        <Button className="startBtn">Start</Button>
        <ViewTypeSelection
          viewType={viewType}
          onChange={handleViewTypeChange}
        />
      </Flex>
      {buildViewContainer()}
    </Box>
  );
};

export default DataViews;
