import React, {
  useState,
  Profiler,
  ProfilerOnRenderCallback,
  useEffect,
} from "react";
import {
  Heading,
  Button,
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { viewTypeContainerStyles } from "./DataViewsStyles";
import ViewTypeSelection from "./components/ViewTypeSelection";
import Table from "./components/Table";
import GroupedTable from "./components/GroupedTable";
import Tiles from "./components/Tiles";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useMeasurementsInLocalStorage } from "hooks";
import { ViewType, Measurement } from "types";

const DataViews = () => {
  const [viewType, setViewType] = useState<ViewType>("table");
  const [started, setStarted] = useState(false);
  const fetchDuration = useSelector((state) => (state as any).fetchDuration);
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const { addMeasurement } = useMeasurementsInLocalStorage();
  const {
    isOpen: isLoadingOpen,
    onOpen: onLoadingOpen,
    onClose: onLoadingClose,
  } = useDisclosure();
  const toast = useToast();

  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type);
  };

  useEffect(() => {
    if (fetchDuration && measurement) {
      addMeasurement({ ...measurement, fetchDuration });
      setMeasurement(null);
      // set spinner to false
      onLoadingClose();
      toast({
        title: "Measurement Created - Mount phase",
        description: `New Measurement with id ${measurement.id} created successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fetchDuration, measurement, addMeasurement, onLoadingClose, toast]);

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

    if (phase === "mount") {
      // add a new measurement to localstorage and show a snackbar on completion.
      // part of the profile date from this args object, part from time taken for fetch
      // which happens within the rendered component.

      // measuring mount phase while rendering
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
    onLoadingOpen();
    setTimeout(() => {
      // remove view from dom node and render again after 2 seconds for new profiling
      setStarted(true);
    }, 2000);
  };

  const buildLoadingIndicator = () => (
    <Modal isOpen={isLoadingOpen} onClose={onLoadingClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Creating Performance data</ModalHeader>
        <ModalBody>
          <Flex justifyContent="center" alignItems="center" h="20vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

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
        default:
          return (
            <Profiler id="tiles" onRender={handleProfile}>
              <Tiles />
            </Profiler>
          );
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
      {buildLoadingIndicator()}
    </Box>
  );
};

export default DataViews;
