import * as hooks from "react-redux";
import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../Table";
import * as useFetchHooks from "hooks/useFetch";

describe("Table", () => {
  let dispathMock: any;

  beforeEach(() => {
    dispathMock = jest.fn();
    jest.spyOn(hooks, "useDispatch").mockReturnValue(dispathMock);
  });

  it(`renders table with heading 'Comments from Placeholder API'`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: [],
          error: false,
          fetchDuration: 0,
        } as any)
    );
    render(<Table />);
    expect(
      screen.getByText(/comments from placeholder api/i)
    ).toBeInTheDocument();
  });

  it(`non-zero fetch duration dispatches the fetch duration`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: null,
          error: false,
          fetchDuration: 100,
        } as any)
    );
    render(<Table />);
    expect(dispathMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "EMIT_FETCH_DURATION",
        payload: 100,
      })
    );
  });

  it(`shows 'Fetching table data' if isLoading is true`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: true,
          response: [],
          error: false,
          fetchDuration: 100,
        } as any)
    );
    render(<Table />);
    expect(screen.getByText(/fetching table data/i)).toBeInTheDocument();
  });

  it(`shows 'Unable to fetch data' is error is true`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: null,
          error: true,
          fetchDuration: 100,
        } as any)
    );
    render(<Table />);
    expect(screen.getByText(/unable to fetch data/i)).toBeInTheDocument();
  });
});
