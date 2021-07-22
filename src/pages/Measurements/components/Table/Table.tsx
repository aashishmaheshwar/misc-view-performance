import {
  Box,
  Button,
  Checkbox,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table as ChakraTable,
} from "@chakra-ui/react";
import format from "date-fns/format";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { responsiveTableStyles } from "reusable_components/ResponsiveTable/ResponsiveTableStyles";
import { Measurement, MeasurementWithSelectedState } from "types";
interface TableProps {
  data: Array<Measurement>;
}

const Table = ({ data: propData }: TableProps) => {
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

  return (
    <Box
      overflowX="auto"
      w="95vw"
      css={responsiveTableStyles("925px")}
      className="measurements-detail-container"
    >
      <ChakraTable
        aria-label="Measurements Table"
        colorScheme="gray"
        variant="striped"
        className="table"
      >
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>View Measurement</Th>
            <Th>Created At</Th>
            <Th>View Type</Th>
            <Th>Fetch Duration</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((measurement, index) => {
            const { id, createdAt, type, selected, fetchDuration } =
              measurement;

            return (
              <Tr key={id}>
                <Td data-label="Select">
                  <Checkbox
                    isChecked={selected}
                    onChange={handleSelect(index)}
                    size="lg"
                    colorScheme="orange"
                    aria-checked={selected}
                    aria-label={`Select measurement : ${id}`}
                  />
                </Td>
                <Td data-label="View Measurement">
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={routeToMeasurementDetail(index)}
                    aria-label={`View measurement : ${id}`}
                  >
                    View
                  </Button>
                </Td>
                <Td data-label="Created At">
                  {format(createdAt as number, "dd-MMM-yyyy hh:mm:ss")}
                </Td>
                <Td data-label="View Type">{type}</Td>
                <Td data-label="Fetch Duration">{fetchDuration}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

export default Table;
