import { Box, Heading, Flex, Button, HStack } from "@chakra-ui/react";
import { useMeasurementsInLocalStorage } from "hooks";
import { viewTypeContainerStyles } from "pages/DataViews/DataViewsStyles";
import React, { useState } from "react";
import { MeasurementViewType } from "types";

const Measurements = () => {
  const { measurements } = useMeasurementsInLocalStorage();
  const [viewType, setViewType] = useState<MeasurementViewType>("table");

  const handleViewTypeChange = (type: MeasurementViewType) => () => {
    setViewType(type);
  };

  return (
    <Box css={viewTypeContainerStyles()}>
      <Heading alignSelf="center" fontWeight="extrabold" size="lg">
        Data Views
      </Heading>
      <Flex className="view-type-container" mt="8">
        <HStack marginLeft="auto">
          <Button
            variant={viewType === "table" ? "solid" : "outline"}
            onClick={handleViewTypeChange("table")}
            colorScheme="blue"
          >
            Table
          </Button>
          <Button
            variant={viewType === "tiles" ? "solid" : "outline"}
            onClick={handleViewTypeChange("tiles")}
            colorScheme="blue"
          >
            Tiles
          </Button>
        </HStack>
      </Flex>
      {/* {buildViewContainer()} */}
      {/* container for select all, aggregate, delete etc buttons. Will be same for multiple views */}
    </Box>
  );
};

export default Measurements;
