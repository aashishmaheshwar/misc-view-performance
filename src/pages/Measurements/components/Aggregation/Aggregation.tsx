import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Measurement } from "types";
import { reduce } from "lodash";

interface Aggregate {
  actualDuration: number;
  baseDuration: number;
  fetchDuration: number;
}

const Aggregation = () => {
  const selectedMeasurements: Array<Measurement> = useSelector(
    (state) => (state as any).selectedMeasurements
  );
  const [aggregate, setAggregate] = useState<Aggregate>();

  useEffect(() => {
    const newAggregateTotal: Aggregate = reduce(
      selectedMeasurements,
      (acc, measurement) => {
        const { actualDuration, baseDuration, fetchDuration } = measurement;

        acc.actualDuration = (acc.actualDuration ?? 0) + actualDuration;
        acc.baseDuration = (acc.baseDuration ?? 0) + baseDuration;
        acc.fetchDuration =
          (acc.fetchDuration ?? 0) + (fetchDuration as number);
        return acc;
      },
      {} as Aggregate
    );
    const selectedMeasurementsLength = selectedMeasurements.length;
    const newAggregate: Aggregate = reduce(
      Object.entries(newAggregateTotal),
      (acc, [attribute, sum]) => {
        acc[attribute as keyof Aggregate] = sum / selectedMeasurementsLength;
        return acc;
      },
      {} as Aggregate
    );

    setAggregate(newAggregate);
  }, [selectedMeasurements]);

  return (
    <StatGroup flexDirection="column">
      <Stat>
        <StatLabel>Actual Duration</StatLabel>
        <StatNumber>{aggregate?.actualDuration}</StatNumber>
        <StatHelpText>Time spent rendering the committed update</StatHelpText>
      </Stat>
      <Divider orientation="horizontal" />
      <Stat>
        <StatLabel>Base Duration</StatLabel>
        <StatNumber>{aggregate?.baseDuration}</StatNumber>
        <StatHelpText>
          Estimated time to render the entire subtree without memoization
        </StatHelpText>
      </Stat>
      <Divider orientation="horizontal" />
      <Stat>
        <StatLabel>Fetch Duration</StatLabel>
        <StatNumber>{aggregate?.fetchDuration}</StatNumber>
        <StatHelpText>
          Estimated time to fetch the data from the server
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default Aggregation;
