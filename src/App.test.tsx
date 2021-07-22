import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "./App";

it("renders welcome message", () => {
  render(<App />);
  const welcomeText = screen.getByText(/Welcome to Data View Profiler/i);
  expect(welcomeText).toBeInTheDocument();
});
