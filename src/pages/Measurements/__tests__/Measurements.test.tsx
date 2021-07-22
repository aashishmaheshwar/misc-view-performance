import * as hooks from "react-redux";
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import Measurements from "../Measurements";
import * as useMeasurementsHooks from "hooks/useMeasurementsInLocalStorage";
import { createMemoryHistory } from "history";
import { getRender } from "test-utils";

// Tiles component mocked
jest.mock("../components/Tiles", () => () => "");

const SampleMeasurements = [
  {
    id: "B7hPaMO5n7b7WUi0ZI2-y",
    type: "tiles",
    phase: "update",
    actualDuration: 0.20000004768371582,
    baseDuration: 0.20000004768371582,
    fetchDuration: 213,
    interactions: new Set(),
    startTime: 47123,
    commitTime: 47124,
    createdAt: 1626791796198,
  },
  {
    id: "B7hPaMO5n7b7WUi0ZI4-y",
    type: "tiles",
    phase: "update",
    actualDuration: 0.20000004768371584,
    baseDuration: 0.20200004768371582,
    fetchDuration: 203,
    interactions: new Set(),
    startTime: 45123,
    commitTime: 45124,
    createdAt: 1626791756198,
  },
];

describe("Measurements", () => {
  let routeComponentPropsMock: any;
  let dispathMock: any;
  let addMeasurementsMock: any;
  let removeMeasurementsMock: any;
  let render;

  beforeEach(() => {
    routeComponentPropsMock = {
      history: createMemoryHistory(),
      location: {} as any,
      match: {} as any,
    };
    addMeasurementsMock = jest.fn();
    removeMeasurementsMock = jest.fn();
    dispathMock = jest.fn();
    jest.spyOn(hooks, "useDispatch").mockReturnValue(dispathMock);
    jest
      .spyOn(useMeasurementsHooks, "useMeasurementsInLocalStorage")
      .mockImplementation(
        () =>
          ({
            measurements: SampleMeasurements,
            addMeasurements: addMeasurementsMock,
            removeMeasurements: removeMeasurementsMock,
          } as any)
      );
    render = getRender({
      selectedMeasurements: [
        {
          ...SampleMeasurements[1],
        },
      ],
    });
    render(<Measurements {...routeComponentPropsMock} />);
  });

  it(`renders measurements page with heading 'Measurements'`, () => {
    expect(screen.getByText(/measurements/i)).toBeInTheDocument();
  });

  describe("select/unselect all", () => {
    it("clicking select all dispatches ASSIGN_MEASUREMENTS action with all the measurements", () => {
      fireEvent.click(screen.getByText("Select All"));
      expect(dispathMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: "ASSIGN_MEASUREMENTS",
          payload: SampleMeasurements,
        })
      );
    });

    it("clicking unselect all dispatches ASSIGN_MEASUREMENTS action with []", () => {
      fireEvent.click(screen.getByText("Un-Select All"));
      expect(dispathMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: "ASSIGN_MEASUREMENTS",
          payload: expect.objectContaining({
            length: 0,
          }),
        })
      );
    });
  });

  describe(`delete`, () => {
    let deleteBtn;
    let deletePopupTitle: any;
    beforeEach(async () => {
      deleteBtn = screen.getByText("Delete");
      fireEvent.click(deleteBtn);
      deletePopupTitle = await screen.findByText(
        "Delete Selected Measurements"
      );
    });

    it(`clicking delete opens the confirmation popup`, () => {
      expect(deletePopupTitle).toBeInTheDocument();
    });

    it(`clicking 'Cancel' on confirmation popup, 
    closes it without deleting the selected measurements`, () => {
      const cancelBtn = screen.getByText("Cancel");
      fireEvent.click(cancelBtn);
      expect(removeMeasurementsMock).not.toHaveBeenCalled();
    });

    it(`clicking 'Delete' on confirmation popup,
     calls 'removeMeasurements' with selected measurements`, async () => {
      const deleteBtn = screen.getByRole("button", { name: "Delete" });
      fireEvent.click(deleteBtn);
      expect(removeMeasurementsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          length: 1,
        })
      );
      const toastMsg = await screen.findByText(
        "Selected Measurements have been deleted successfully"
      );
      expect(toastMsg).toBeInTheDocument();
    });
  });

  describe("aggregate", () => {
    it(`clicking on Aggregate button opens the aggregated values of selected measurements`, async () => {
      const aggregateBtn = screen.getByRole("button", {
        name: "aggregate measurements of selected",
      });
      fireEvent.click(aggregateBtn);
      const aggregateTitleMsg = await screen.findByText(
        "Aggregate of selected measurements"
      );
      expect(aggregateTitleMsg).toBeInTheDocument();
    });
  });

  describe("view type", () => {
    it(`renders the table view by default`, () => {
      expect(
        JSON.parse(
          screen.getByRole("button", { name: "Table" }).dataset
            .selected as string
        )
      ).toBeTruthy();
      expect(
        JSON.parse(
          screen.getByRole("button", { name: "Tiles" }).dataset
            .selected as string
        )
      ).toBeFalsy();
    });

    it(`clicking on Tiles changes to the tile view`, () => {
      fireEvent.click(screen.getByRole("button", { name: "Tiles" }));
      expect(
        JSON.parse(
          screen.getByRole("button", { name: "Table" }).dataset
            .selected as string
        )
      ).toBeFalsy();
      expect(
        JSON.parse(
          screen.getByRole("button", { name: "Tiles" }).dataset
            .selected as string
        )
      ).toBeTruthy();
    });
  });
});
