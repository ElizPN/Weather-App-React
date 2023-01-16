import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
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
    const addCityTextField = screen.getByTestId("add-city-field");
    expect(addCityTextField).toBeInTheDocument();
  });

  test("Add button exists", () => {
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
    const addButton = screen.getByTestId("add-button");
    expect(addButton).toBeInTheDocument();
  });

  test("After click on button handleOnclick is called", () => {
    const handeOnChange = jest.fn();
    const handleOnclick = jest.fn();

    render(
      <AddCity
        inputValue={"Barcelona"}
        err={""}
        sameCityMessage={""}
        handeOnChange={handeOnChange}
        handleOnclick={handleOnclick}
      />
    );
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(handleOnclick).toBeCalled();
  });
});
