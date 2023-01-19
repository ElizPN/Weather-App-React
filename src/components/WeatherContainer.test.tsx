import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent, act } from "@testing-library/react";
import { WeatherContainer } from "./WeatherContainer";

describe("WeatherContainer", () => {
  const mockResponse = {
    cod: 200,
    weather: [{ description: "clear sky" }],
    main: { temp: 15 },
    sys: { country: "ES" },
    name: "Barcelona",
  };

  const fetchFakeWeatherdata = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockResponse);
  });

  const mockError = { cod: "404", message: "city not found" };

  const fetchFakeError = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockError);
  });

  test("after clicking the Add button, display a CityCard with the city entered in the input", async () => {
    render(<WeatherContainer fetchWeatherData={fetchFakeWeatherdata} />);

    const addCityTextField = screen.getByTestId("add-city-field");
    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "Barcelona" },
      });
    });

    expect(addCityTextField).toBeInTheDocument();
    
    const addButton = screen.getByTestId("add-button");
    act(() => {
      fireEvent.click(addButton);
    });

    expect(await screen.findByTestId("city-card-0")).toBeInTheDocument();
  });

  test("error 404", async () => {
    render(<WeatherContainer fetchWeatherData={fetchFakeError} />);

    const addCityTextField = screen.getByTestId("add-city-field");
    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "incorrect city" },
      });
    });

    expect(addCityTextField).toBeInTheDocument();

    const addButton = screen.getByTestId("add-button");
    act(() => {
      fireEvent.click(addButton);
    });

    expect(await screen.findByTestId("404-error")).toBeInTheDocument();
  });
});
