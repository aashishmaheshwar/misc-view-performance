import React, { useState, Profiler, ProfilerOnRenderCallback } from "react";
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

  const handleProfile: ProfilerOnRenderCallback = (...args) => {
    const [
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    ] = args;
    // set spinner to false

    if (phase === "mount") {
      // add a new measurement to localstorage and show a snackbar on completion.
      // part of the profile date from this args object, part from time taken for fetch
      // which happens within the rendered component.
    }
  };

  const handleStart = () => {
    setStarted(false);
    // set spinner to true - saying profiling;
    setTimeout(() => {
      // remove view from dom node and render again after 2 seconds for new profiling
      setStarted(true);
    }, 2000);
  };

  const buildViewContainer = () => {
    // testing
    if (started) {
      return (
        <Profiler id="table" onRender={handleProfile}>
          <div>table renders here</div>
        </Profiler>
      );
    }
    return null;
  };

  return (
    <Box css={viewTypeContainerStyles()}>
      <Heading alignSelf="center" fontWeight="extrabold" size="lg">
        Data Views
      </Heading>
      <Flex className="view-type-container" mt="8">
        <Button className="startBtn" onClick={handleStart}>
          Start
        </Button>
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
