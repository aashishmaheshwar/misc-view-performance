import { Box, Heading, Flex, Button, HStack } from "@chakra-ui/react";
import { useMeasurementsInLocalStorage } from "hooks";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MeasurementViewType } from "types";
import Table from "./components/Table";
import Tiles from "./components/Tiles";
import { measurementsContainerStyles } from "./MeasurementStyles";

const Measurements = () => {
  const { measurements } = useMeasurementsInLocalStorage();
  const [viewType, setViewType] = useState<MeasurementViewType>("table");
  const dispatch = useDispatch();

  const handleViewTypeChange = (type: MeasurementViewType) => () => {
    setViewType(type);
  };

  const handleAll = (select: boolean) => () => {
    if (select) {
      dispatch({ type: "ASSIGN_MEASUREMENTS", payload: measurements });
    } else {
      dispatch({ type: "ASSIGN_MEASUREMENTS", payload: [] });
    }
  };

  const buildViewContainer = () => {
    switch (viewType) {
      case "table":
        return <Table data={measurements} />;
      case "tiles":
        return <Tiles data={measurements} />;
      default:
        return null;
    }
  };

  const buildActionBtnContainer = () => (
    <HStack justifyContent="flex-end" pt="3">
      <Button variant="outline" onClick={handleAll(true)} colorScheme="blue">
        Select All
      </Button>
      <Button variant="outline" onClick={handleAll(false)} colorScheme="blue">
        Un-Select All
      </Button>
      <Button
        variant="outline"
        onClick={handleViewTypeChange("tiles")}
        colorScheme="blue"
        title="aggregate measurements of selected"
      >
        Aggregate
      </Button>
      <Button
        variant="outline"
        onClick={handleViewTypeChange("tiles")}
        colorScheme="blue"
        title="delete selected"
      >
        Delete
      </Button>
    </HStack>
  );

  return (
    <Box css={measurementsContainerStyles()}>
      <Heading alignSelf="center" fontWeight="extrabold" size="lg">
        Measurements
      </Heading>
      <Flex className="measurements-container" mt="-8">
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
      {buildViewContainer()}
      {buildActionBtnContainer()}
    </Box>
  );
};

export default Measurements;
