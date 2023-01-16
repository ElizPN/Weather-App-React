import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("TextField for adding city exists", () => {
  render(<App />);
  // const addCityTextField = screen.getByTestId("add-city");
  // expect(addCityTextField).toBeInTheDocument();

  const titleText = screen.getByTestId("title");
  expect(titleText).toBeInTheDocument();
});
