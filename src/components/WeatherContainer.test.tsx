import "@testing-library/jest-dom/extend-expect";
import {
  screen,
  render,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { CityItem, WeatherContainer } from "./WeatherContainer";
import { WeatherContext } from "./WeatherContextBox";

//jest.mock("./CityCards", () => jest.fn(() => <div>CityCards component</div>));
//jest.mock("./AddCity", () => jest.fn(() => <div>AddCity component</div>));

const fetchWeatherData = jest.fn();
const cityItems: CityItem[] = [];
const setCityItems = jest.fn();
const inputValue = "";
const setInputValue = jest.fn();

describe("WeatherContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it.skip("should call fetchWeatherData with correct parameter", async () => {
    render(
      <WeatherContext.Provider
        value={{ inputValue: "Berlin", setInputValue, cityItems, setCityItems }}
      >
        <WeatherContainer fetchWeatherData={fetchWeatherData} />
      </WeatherContext.Provider>
    );

    // const addCityTextField = screen.getByTestId("add-city-field");
    // act(() => {
    //   fireEvent.change(addCityTextField, {
    //     target: { value: "Berlin" },
    //   });
    // });
    // expect(addCityTextField).toBeInTheDocument();

    const addButton = screen.getByTestId("add-button");
    act(() => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      //expect(setCityItems).toHaveBeenCalled();
      expect(fetchWeatherData).toHaveBeenCalledWith("Berlin");
    });

    //expect(await screen.findByTestId("city-card-0")).toBeInTheDocument();
  });

  it("should call setCityItems with correct parameter", async () => {
    render(
      <WeatherContext.Provider
        value={{ inputValue: "Berlin", setInputValue, cityItems, setCityItems }}
      >
        <WeatherContainer fetchWeatherData={fetchFakeWeatherdata} />
      </WeatherContext.Provider>
    );

    // const addCityTextField = screen.getByTestId("add-city-field");
    // act(() => {
    //   fireEvent.change(addCityTextField, {
    //     target: { value: "Berlin" },
    //   });
    // });
    // expect(addCityTextField).toBeInTheDocument();

    const addButton = screen.getByTestId("add-button");
    act(() => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(setCityItems).toHaveBeenCalledWith([
        {
          cityName: "Barcelona",
          countryName: "ES",
          temperature: 15,
          weatherDecription: "clear sky",
          weatherIcon: "img/weather-icons/undefined.svg",
        },
      ]);
    });

    //expect(await screen.findByTestId("city-card-0")).toBeInTheDocument();
  });

  it.skip("should show error message when invalid city", async () => {
    render(
      <WeatherContext.Provider
        value={{ inputValue, setInputValue, cityItems, setCityItems }}
      >
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

  it.skip("Should show message about same city, if same city already exists in a list", async () => {
    render(
      <WeatherContext.Provider
        value={{ inputValue, setInputValue, cityItems, setCityItems }}
      >
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
