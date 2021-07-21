import {
  Box,
  Heading,
  Flex,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useMeasurementsInLocalStorage } from "hooks";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Measurement, MeasurementViewType } from "types";
import Aggregation from "./components/Aggregation";
import Table from "./components/Table";
import Tiles from "./components/Tiles";
import { measurementsContainerStyles } from "./MeasurementStyles";

const Measurements = () => {
  const { measurements, removeMeasurements } = useMeasurementsInLocalStorage();
  const [viewType, setViewType] = useState<MeasurementViewType>("table");
  const dispatch = useDispatch();
  const {
    isOpen: isAggregateOpen,
    onOpen: onAggregateOpen,
    onClose: onAggregateClose,
  } = useDisclosure();
  const selectedMeasurements: Array<Measurement> = useSelector(
    (state) => (state as any).selectedMeasurements
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  const onDeleteConfirmClose = () => setIsDeleteConfirmOpen(false);

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

  const handleDelete = () => {
    removeMeasurements(selectedMeasurements);
    onDeleteConfirmClose();
    toast({
      title: "Deleted",
      description: "Selected Measurements have been deleted successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDeleteConfirmationOpen = () => {
    setIsDeleteConfirmOpen(true);
  };

  const buildDeleteConfirmationModal = () => (
    <AlertDialog
      isOpen={isDeleteConfirmOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={onDeleteConfirmClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Selected Measurements
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef as any} onClick={onDeleteConfirmClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  const buildAggregateModal = () => (
    <Modal
      blockScrollOnMount={false}
      isOpen={isAggregateOpen}
      onClose={onAggregateClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Aggregate of selected measurements</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Aggregation />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

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
        onClick={onAggregateOpen}
        colorScheme="blue"
        title="aggregate measurements of selected"
        disabled={!selectedMeasurements.length}
      >
        Aggregate
      </Button>
      <Button
        variant="outline"
        onClick={handleDeleteConfirmationOpen}
        colorScheme="blue"
        title="delete selected"
        disabled={!selectedMeasurements.length}
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
            data-selected={viewType === "table"}
          >
            Table
          </Button>
          <Button
            variant={viewType === "tiles" ? "solid" : "outline"}
            onClick={handleViewTypeChange("tiles")}
            colorScheme="blue"
            data-selected={viewType === "tiles"}
          >
            Tiles
          </Button>
        </HStack>
      </Flex>
      {buildViewContainer()}
      {buildActionBtnContainer()}
      {buildAggregateModal()}
      {buildDeleteConfirmationModal()}
    </Box>
  );
};

export default Measurements;
