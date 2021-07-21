import React from "react";
import { render, screen } from "@testing-library/react";
import MeasurementDetail from "../MeasurementDetail";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useLocation: () => ({
    state: {
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
  }),
}));

describe("MeasurementDetail", () => {
  it('renders with text "Measurement taken at"', () => {
    render(<MeasurementDetail />);
    expect(screen.getByText(/Measurement taken at/)).toBeInTheDocument();
  });
});
