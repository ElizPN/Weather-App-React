import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent, act } from "@testing-library/react";
import { CityItem, WeatherContainer } from "./WeatherContainer";
import { WeatherContext } from "./WeatherContextBox";
import { useState } from "react";

function fakeResponce(mockService: {}) {
  function MockWeatherContextBox() {
    const [inputValue, setInputValue] = useState<string>("");
    const [cityItems, setCityItems] = useState<CityItem[]>([]);

    const contextValue = {
      inputValue,
      setInputValue,
      cityItems,
      setCityItems,
    };

    const fetchFakeWeatherdata = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockService);
    });

    return (
      <WeatherContext.Provider value={contextValue}>
        <WeatherContainer fetchWeatherData={fetchFakeWeatherdata} />
      </WeatherContext.Provider>
    );
  }

  return <MockWeatherContextBox />;
}

describe("WeatherContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const positiveMockResponse = {
    cod: 200,
    weather: [{ description: "clear sky" }],
    main: { temp: 15 },
    sys: { country: "ES" },
    name: "Barcelona",
  };

  const mockErrorResponce = { cod: "404", message: "city not found" };

  it("should render city card with positive responce from API", async () => {
    render(fakeResponce(positiveMockResponse));

    const addCityTextField = screen.getByTestId("add-city-field");
    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "Berlin" },
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
    render(fakeResponce(mockErrorResponce));

    const addCityTextField = screen.getByTestId("add-city-field");
    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "incorrect value" },
      });
    });

    const addButton = screen.getByTestId("add-button");
    act(() => {
      fireEvent.click(addButton);
    });

    expect(await screen.findByTestId("404-error")).toBeInTheDocument();
  });

  it("should show message about same city if same city already exists in a list", async () => {
    render(fakeResponce(positiveMockResponse));

    const addCityTextField = screen.getByTestId("add-city-field");
    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "Barcelona" },
      });
      fireEvent.click(screen.getByTestId("add-button"));
    });

    await screen.findByTestId("city-card-0");

    act(() => {
      fireEvent.change(addCityTextField, {
        target: { value: "Barcelona" },
      });
      fireEvent.click(screen.getByTestId("add-button"));
    });

    expect(await screen.findByTestId("same-city-message")).toBeInTheDocument();
  });
});
