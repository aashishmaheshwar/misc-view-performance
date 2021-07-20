import React from "react";
import Home from "pages/Home";
import { render, getByText } from "@testing-library/react";

describe("Home", () => {
  it("on render - renders welcome text", () => {
    const { container } = render(<Home />);
    expect(
      getByText(container, "Welcome to Data View Profiler")
    ).toBeInTheDocument();
  });
});
