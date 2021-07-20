import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
} from "@chakra-ui/react";
import format from "date-fns/format";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Measurement } from "types";
import { map } from "lodash";

const MeasurementDetailConfig = [
  {
    label: "View type",
    key: "type",
    helperText: "Type of Data Display",
  },
  {
    label: "Actual Duration",
    key: "actualDuration",
    helperText: "Time spent rendering the committed update",
  },
  {
    label: "Base Duration",
    key: "baseDuration",
    helperText:
      "Estimated time to render the entire subtree without memoization",
  },
  {
    label: "Fetch Duration",
    key: "fetchDuration",
    helperText: "Estimated time to fetch the data from the server",
  },
  {
    label: "Start Time",
    key: "startTime",
    helperText: "when React began rendering this update",
  },
  {
    label: "Commit Time",
    key: "commitTime",
    helperText: "when React committed this update",
  },
];

const MeasurementDetail = () => {
  const location = useLocation();
  const measurementDetailConfig = useMemo(() => MeasurementDetailConfig, []);

  const measurementDetail: Measurement = useMemo(
    () => ({ ...(location.state as Measurement) }),
    [location.state]
  );

  const { createdAt } = measurementDetail;

  return (
    <>
      <Heading alignSelf="center" fontWeight="extrabold" size="lg">
        {`Measurement taken at ${format(
          createdAt as number,
          "dd-MMM-yyyy hh:mm:ss"
        )}`}
      </Heading>
      <StatGroup>
        {map(measurementDetailConfig, ({ label, key, helperText }) => (
          <Stat m="3" key={key}>
            <StatLabel>{label}</StatLabel>
            <StatNumber>
              {measurementDetail[key as keyof Measurement]}
            </StatNumber>
            <StatHelpText>{helperText}</StatHelpText>
          </Stat>
        ))}
      </StatGroup>
    </>
  );
};

export default MeasurementDetail;
