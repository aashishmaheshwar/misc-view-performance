import {
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
    (measurement: MeasurementWithSelectedState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const { selected, ...measurementWithoutSelectedFlag } = measurement;

      if (checked) {
        dispatch({
          type: "ADD_MEASUREMENT",
          payload: measurementWithoutSelectedFlag,
        });
      } else {
        dispatch({
          type: "REMOVE_MEASUREMENT",
          payload: measurementWithoutSelectedFlag,
        });
      }
    };

  const buildTile = (measurement: MeasurementWithSelectedState) => {
    const { id, selected } = measurement;

    return (
      <VStack css={tileStyles()} key={id}>
        <HStack spacing={5} w="100%">
          <Checkbox
            size="lg"
            colorScheme="orange"
            isChecked={selected}
            marginLeft="auto"
            onChange={handleSelect(measurement)}
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
      {data.map((tile) => buildTile(tile))}
    </Flex>
  );
};

export default Tiles;
