import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { AddCity } from "./AddCity";

describe("AddCity", () => {
  const handeOnChange = jest.fn();
  const handleOnclick = jest.fn();

  test("TextField for adding city exists", () => {
    render(
      <AddCity
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
    render(
      <AddCity
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
    render(
      <AddCity
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
