import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent, act } from "@testing-library/react";
import { WeatherContainer } from "./WeatherContainer";
import { WeatherContext } from "./WeatherContextBox";

describe("WeatherContainer", () => {
  const mockResponse = {
    cod: 200,
    weather: [{ description: "clear sky" }],
    main: { temp: 15 },
    sys: { country: "ES" },
    name: "Barcelona",
  };

  // I am not sure that I need this mock data in this test suite
  const mockContextValue = {
    inputValue: "Barcelona",
    setInputValue: jest.fn(),
    cityItems: [
      {
        cityName: "Barcelona",
        temperature: 15,
        countryName: "ES",
        weatherDecription: "clear sky",
        weatherIcon: "02b",
      },
    ],
    setCityItems: jest.fn(),
  };

  jest.mock("react", () => {
    const original = jest.requireActual("react");
    return {
      ...original,
      useContext: jest.fn(() => mockContextValue),
    };
  });

  const fetchFakeWeatherdata = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockResponse);
  });

  const mockError = { cod: "404", message: "city not found" };

  const fetchFakeError = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockError);
  });

  it("should render city card after get successful response from api", async () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <WeatherContainer fetchWeatherData={fetchFakeWeatherdata} />
      </WeatherContext.Provider>
    );

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

  it("should show error message when invalid city", async () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <WeatherContainer fetchWeatherData={fetchFakeError} />
      </WeatherContext.Provider>
    );

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

    expect(await screen.findByTestId("404-error")).toBeInTheDocument();
  });

  it("Should show message about same city, if same city already exists in a list", async () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <WeatherContainer fetchWeatherData={fetchFakeWeatherdata} />
      </WeatherContext.Provider>
    );

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

    await screen.findByTestId("city-card-0");

    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "Barcelona" },
      });
    });

    act(() => {
      fireEvent.click(addButton);
    });

    expect(await screen.findByTestId("same-city-message")).toBeInTheDocument();
  });
});
