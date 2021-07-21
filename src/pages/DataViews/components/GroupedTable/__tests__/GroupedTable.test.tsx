import * as hooks from "react-redux";
import React from "react";
import { render, screen } from "@testing-library/react";
import GroupedTable from "../GroupedTable";
import * as useFetchHooks from "hooks/useFetch";
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

describe("GroupedTable", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = jest.fn();
    jest.spyOn(hooks, "useDispatch").mockReturnValue(dispatchMock);
  });

  it(`renders GroupedTable with heading 'Comments grouped by Post ID from Placeholder API'`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: Comments,
          error: false,
          fetchDuration: 0,
        } as any)
    );
    render(<GroupedTable />);
    expect(
      screen.getByText(/comments grouped by post id from placeholder api/i)
    ).toBeInTheDocument();
  });

  it(`renders multiple groups based on postId each with own heading`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: Comments,
          error: false,
          fetchDuration: 0,
        } as any)
    );
    render(<GroupedTable />);
    expect(screen.getByText(/Comments for Post ID 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Comments for Post ID 2/i)).toBeInTheDocument();
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
    render(<GroupedTable />);
    expect(dispatchMock).toHaveBeenCalledWith(
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
          response: null,
          error: false,
          fetchDuration: 100,
        } as any)
    );
    render(<GroupedTable />);
    expect(screen.getByText(/fetching table data/i)).toBeInTheDocument();
  });

  it(`shows 'Unable to fetch data' if error is true`, () => {
    jest.spyOn(useFetchHooks, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: false,
          response: null,
          error: true,
          fetchDuration: 100,
        } as any)
    );
    render(<GroupedTable />);
    expect(screen.getByText(/unable to fetch data/i)).toBeInTheDocument();
  });
});
