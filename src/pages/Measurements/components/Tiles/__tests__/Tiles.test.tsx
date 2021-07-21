import * as hooks from "react-redux";
import React, { ReactElement } from "react";
import performanceReducer from "reducers/view-performace.reducer";
import { createStore } from "redux";
import { fireEvent, render as rtlRender, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Measurement } from "types";
import Tiles from "../Tiles";
import { Router } from "react-router-dom";

const initialState = { selectedMeasurements: [] };

const Measurements = [
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

function getRender(initialState: any) {
  return function render(
    ui: ReactElement,
    {
      store = createStore(performanceReducer, initialState),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }: any) {
      return <hooks.Provider store={store}>{children}</hooks.Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  };
}

describe("Tiles", () => {
  let routeComponentPropsMock: any;

  let dispathMock: any;

  beforeEach(() => {
    routeComponentPropsMock = {
      history: createMemoryHistory(),
      location: {} as any,
      match: {} as any,
    };

    dispathMock = jest.fn();
    jest.spyOn(hooks, "useDispatch").mockReturnValue(dispathMock);
  });

  it("on render - renders tiles correctly", () => {
    const render = getRender(initialState);
    render(
      <Tiles
        {...routeComponentPropsMock}
        data={Measurements as Measurement[]}
      />
    );
    expect(screen.getAllByText("Created At")[0]).toBeInTheDocument();
    expect(screen.getAllByText("20-Jul-2021 08:06:36")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Created At").length).toBe(2);
  });

  describe("selection", () => {
    it(`having one selected measurement on render - checks the measurement's checkbox`, () => {
      const render = getRender({
        selectedMeasurements: [
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
        ],
      });
      render(
        <Tiles
          {...routeComponentPropsMock}
          data={Measurements as Measurement[]}
        />
      );
      expect(
        screen.getByRole("checkbox", { checked: true })
      ).toBeInTheDocument();
      expect(
        screen
          .getByLabelText("Select measurement : B7hPaMO5n7b7WUi0ZI4-y")
          .closest("[aria-checked='true']")
      ).toBeInTheDocument();
      expect(screen.getAllByRole("checkbox", { checked: true }).length).toBe(1);
    });

    it(`selecting a checkbox dispatches an 'ADD_MEASUREMENT' action`, () => {
      const render = getRender(initialState);
      render(
        <Tiles
          {...routeComponentPropsMock}
          data={Measurements as Measurement[]}
        />
      );
      const secondTileCheckbox = screen
        .getByLabelText("Select measurement : B7hPaMO5n7b7WUi0ZI4-y")
        .closest("[aria-checked='false']");
      fireEvent.click(secondTileCheckbox as HTMLInputElement);
      expect(dispathMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "ADD_MEASUREMENT",
        })
      );
    });

    it(`un-selecting a checkbox dispatches an 'REMOVE_MEASUREMENT' action`, () => {
      const render = getRender({
        selectedMeasurements: [{ ...Measurements[1] }],
      });
      render(
        <Tiles
          {...routeComponentPropsMock}
          data={Measurements as Measurement[]}
        />
      );
      const secondTileCheckbox = screen
        .getByLabelText("Select measurement : B7hPaMO5n7b7WUi0ZI4-y")
        .closest("[aria-checked='true']");
      fireEvent.click(secondTileCheckbox as HTMLInputElement);
      expect(dispathMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "REMOVE_MEASUREMENT",
        })
      );
    });
  });

  it(`clicking view redirects to measurement detail page`, () => {
    const history = createMemoryHistory();
    const render = getRender({
      selectedMeasurements: [{ ...Measurements[1] }],
    });
    render(
      <Router history={history}>
        <Tiles data={Measurements as Measurement[]} />
      </Router>
    );
    const viewBtn = screen.getByLabelText(
      "View measurement : B7hPaMO5n7b7WUi0ZI4-y"
    );
    fireEvent.click(viewBtn);
    expect(history.location.pathname).toBe(
      "/measurement/B7hPaMO5n7b7WUi0ZI4-y"
    );
  });
});
