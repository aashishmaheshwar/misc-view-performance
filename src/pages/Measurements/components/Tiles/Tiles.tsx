import {
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { tileStyles } from "pages/DataViews/components/Tiles/components/Tile/TileStyles";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Measurement } from "types";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

interface TileProps {
  data: Array<Measurement>;
}

const MeasurementInfo: Array<{ label: string; key: string }> = [
  {
    label: "Created At",
    key: "createdAt",
  },
  { label: "Type of View", key: "type" },
  { label: "Actual Duration", key: "actualDuration" },
  { label: "Base Duration", key: "baseDuration" },
  { label: "Fetch Duration", key: "fetchDuration" },
];

interface MeasurementWithSelectedState extends Measurement {
  selected?: boolean;
}

const Tiles = ({ data: propData }: TileProps) => {
  const measurementInfo = useMemo(() => MeasurementInfo, []);
  const selectedMeasurements: Array<Measurement> = useSelector(
    (state) => (state as any).selectedMeasurements
  );
  const [data, setData] = useState<Array<MeasurementWithSelectedState>>([]);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    const selectedMeasurementsIdSet = new Set(
      selectedMeasurements.map(({ id }) => id)
    );
    const newData: Array<MeasurementWithSelectedState> = propData.reduce(
      (acc, item) => {
        const newItem: MeasurementWithSelectedState = { ...item };

        if (selectedMeasurementsIdSet.has(item.id)) {
          newItem.selected = true;
        } else {
          newItem.selected = false;
        }

        acc.push(newItem);
        return acc;
      },
      [] as Array<MeasurementWithSelectedState>
    );

    setData(newData);
  }, [propData, selectedMeasurements]);

  const handleSelect =
    (tileIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      if (checked) {
        dispatch({
          type: "ADD_MEASUREMENT",
          payload: propData[tileIndex],
        });
      } else {
        dispatch({
          type: "REMOVE_MEASUREMENT",
          payload: propData[tileIndex],
        });
      }
    };

  const routeToMeasurementDetail = (tileIndex: number) => () => {
    history.push({
      pathname: `/measurement/${propData[tileIndex].id}`,
      state: propData[tileIndex],
    });
  };

  const buildTile = (
    measurement: MeasurementWithSelectedState,
    tileIndex: number
  ) => {
    const { id, selected } = measurement;

    return (
      <VStack css={tileStyles()} key={id}>
        <HStack spacing={5} w="100%">
          <Button
            variant="outline"
            marginRight="auto"
            onClick={routeToMeasurementDetail(tileIndex)}
            colorScheme="blue"
            aria-label={`View measurement : ${id}`}
          >
            View
          </Button>
          <Checkbox
            size="lg"
            colorScheme="orange"
            isChecked={selected}
            aria-checked={selected}
            aria-label={`Select measurement : ${id}`}
            marginLeft="auto"
            onChange={handleSelect(tileIndex)}
            title="select"
          />
        </HStack>
        {measurementInfo.map(({ key, label }) => (
          <HStack key={label} w="100%">
            <Heading size="xs" mt="2" mb="2" alignSelf="flex-start">
              {label}
            </Heading>
            <Text textAlign="right" flex="1">
              {key === "createdAt"
                ? format(
                    measurement[key as keyof Measurement] as number,
                    "dd-MMM-yyyy hh:mm:ss"
                  )
                : measurement[key as keyof Measurement]}
            </Text>
          </HStack>
        ))}
      </VStack>
    );
  };

  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      className="measurements-detail-container"
    >
      {data.map((tile, index) => buildTile(tile, index))}
    </Flex>
  );
};

export default Tiles;
