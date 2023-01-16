import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { AddCity } from "./AddCity";

describe("AddCity", () => {
  test("TextField for adding city exists", () => {
    const handeOnChange = jest.fn();
    const handleOnclick = jest.fn();

    render(
      <AddCity
        inputValue={""}
        err={""}
        sameCityMessage={""}
        handeOnChange={handeOnChange}
        handleOnclick={handleOnclick}
      />
    );
    const addCityTextField = screen.getByTestId("city-field");
    expect(addCityTextField).toBeInTheDocument();
  });
});
