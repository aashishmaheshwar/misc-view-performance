import * as hooks from "react-redux";
import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import DataViews from "../DataViews";
import * as useMeasurementsHooks from "hooks/useMeasurementsInLocalStorage";
import * as useFetchHooks from "hooks/useFetch";
import { getRender } from "test-utils";

import { Comment } from "types";

const Comments: Array<Comment> = [
  {
    id: 1,
    postId: 1,
    name: "first person comment - blog 1",
    email: "first@gmaail.com",
    body: "A very long message indeed - p1",
  },
  {
    id: 2,
    postId: 1,
    name: "second person comment - blog 1",
    email: "second@gmaail.com",
    body: "A very long message indeed - p2",
  },
  {
    id: 3,
    postId: 2,
    name: "third person comment - blog 2",
    email: "third@gmaail.com",
    body: "A very long message indeed - p3",
  },
];

describe("DataViews", () => {
  let dispathMock: any;
  let addMeasurementsMock: any;
  let render;

  beforeEach(() => {
    addMeasurementsMock = jest.fn();
    dispathMock = jest.fn();
    jest.spyOn(hooks, "useDispatch").mockReturnValue(dispathMock);
    jest
      .spyOn(useMeasurementsHooks, "useMeasurementsInLocalStorage")
      .mockImplementation(
        () =>
          ({
            addMeasurement: addMeasurementsMock,
          } as any)
      );
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: Comments,
          error: false,
          fetchDuration: 250,
        } as any)
    );
    jest.useFakeTimers();
    render = getRender({
      fetchDuration: 250,
    });
    render(<DataViews />);
  });

  it(`renders Data Views page with heading 'Data Views'`, () => {
    expect(screen.getByText(/data views/i)).toBeInTheDocument();
  });

  it(`clicking 'Start' button starts creating the performance data`, async () => {
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    const spinnerText = await screen.findByText(/creating performance data/i);
    expect(spinnerText).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2000) as any);
    expect(addMeasurementsMock).toHaveBeenCalled();
  });

  it(`changing view type and clicking 'Start' profiles the new view type`, async () => {
    fireEvent.click(screen.getByRole("button", { name: "Grouped Table" }));
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    let spinnerText = await screen.findByText(/creating performance data/i);
    expect(spinnerText).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2000) as any);
    expect(addMeasurementsMock).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Tiles" }));
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    spinnerText = await screen.findByText(/creating performance data/i);
    expect(spinnerText).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2000) as any);
    expect(addMeasurementsMock).toHaveBeenCalled();
  });
});
