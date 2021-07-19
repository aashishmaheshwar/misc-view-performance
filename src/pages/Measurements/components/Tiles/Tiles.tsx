import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { tileStyles } from "pages/DataViews/components/Tiles/components/Tile/TileStyles";
import React, { useMemo } from "react";
import { Measurement } from "types";
import { format } from "date-fns";

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

const Tiles = ({ data }: TileProps) => {
  const measurementInfo = useMemo(() => MeasurementInfo, []);

  const buildTile = (measurement: Measurement) => {
    const { id } = measurement;

    return (
      <VStack css={tileStyles()} key={id}>
        {measurementInfo.map(({ key, label }) => (
          <HStack key={label} w="100%">
            <Heading size="xs" mt="2" mb="2" alignSelf="flex-start">
              {label}
            </Heading>
            <Text textAlign="right" flex="1">
              {measurement[key as keyof Measurement]}
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
