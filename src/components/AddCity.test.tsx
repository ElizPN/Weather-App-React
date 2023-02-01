import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { AddCity } from "./AddCity";
import { WeatherContext } from "./WeatherContextBox";

describe("AddCity", () => {
  const handeOnChange = jest.fn();
  const handleOnclick = jest.fn();

   const mockContextValue = {
     inputValue: "",
     setInputValue: jest.fn(),
     cityItems: [],
     setCityItems: jest.fn(),
   };

   jest.mock("react", () => {
     const original = jest.requireActual("react");
     return {
       ...original,
       useContext: jest.fn(() => mockContextValue),
     };
   });

  it("Should check existing TextField for adding city", () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <AddCity
          err={""}
          sameCityMessage={""}
          handeOnChange={handeOnChange}
          handleOnclick={handleOnclick}
        />
      </WeatherContext.Provider>
    );
    const addCityTextField = screen.getByTestId("add-city-field");
    expect(addCityTextField).toBeInTheDocument();
  });

  it("Should check existing Add button", () => {
  
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <AddCity
          err={""}
          sameCityMessage={""}
          handeOnChange={handeOnChange}
          handleOnclick={handleOnclick}
        />
      </WeatherContext.Provider>
    );
    const addButton = screen.getByTestId("add-button");
    expect(addButton).toBeInTheDocument();
  });

  it("Should call handleOnclick after click on button", () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <AddCity
          err={""}
          sameCityMessage={""}
          handeOnChange={handeOnChange}
          handleOnclick={handleOnclick}
        />
      </WeatherContext.Provider>
    );
    const addButton = screen.getByTestId("add-button");

    fireEvent.click(addButton);
    expect(handleOnclick).toBeCalled();
  });
});
