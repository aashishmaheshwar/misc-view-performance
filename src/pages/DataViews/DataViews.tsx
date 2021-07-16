import React, {
  useState,
  Profiler,
  ProfilerOnRenderCallback,
  useEffect,
} from "react";
import { Heading, Button, Flex, Box } from "@chakra-ui/react";
import { viewTypeContainerStyles } from "./DataViewsStyles";
import ViewTypeSelection from "./components/ViewTypeSelection";
import Table from "./components/Table";
import GroupedTable from "./components/GroupedTable";
import Tiles from "./components/Tiles";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useMeasurementsInLocalStorage } from "hooks/useMeasurementsInLocalStorage";

export type ViewType = "table" | "grouped table" | "tiles";
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Measurement {
  id: string;
  type: ViewType;
  phase: "mount" | "update";
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<any>;
  fetchDuration?: number;
  createdAt?: number;
}

const DataViews = () => {
  const [viewType, setViewType] = useState<ViewType>("table");
  const [started, setStarted] = useState(false);
  const fetchDuration = useSelector((state) => (state as any).fetchDuration);
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const { addMeasurement } = useMeasurementsInLocalStorage();

  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type);
  };

  useEffect(() => {
    if (fetchDuration && measurement) {
      console.log("fetch duration is ", fetchDuration);
      console.log("measurements are ", measurement);
      addMeasurement({ ...measurement, fetchDuration });
      // persisist to measurements array in localStorage
      setMeasurement(null); // last
    }
  }, [fetchDuration, measurement, addMeasurement]);

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
      setMeasurement({
        id: nanoid(),
        type: id as ViewType,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      });
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
    if (started) {
      switch (viewType) {
        case "table":
          return (
            <Profiler id="table" onRender={handleProfile}>
              <Table />
            </Profiler>
          );
        case "grouped table":
          return (
            <Profiler id="grouped table" onRender={handleProfile}>
              <GroupedTable />
            </Profiler>
          );
        case "tiles":
          return (
            <Profiler id="tiles" onRender={handleProfile}>
              <Tiles />
            </Profiler>
          );
        default:
          return null;
      }
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
