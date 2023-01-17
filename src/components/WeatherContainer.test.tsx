import "@testing-library/jest-dom/extend-expect";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
  getByTestId,
} from "@testing-library/react";
import { WeatherContainer } from "./WeatherContainer";

describe("WeatherContainer", () => {
  const fakeWeatherdata = jest.fn().mockImplementation(() => {
    Promise.resolve({
      cod: 200,
      weather: [{ description: "clear sky" }],
      main: { temp: 15.67 },
      sys: { country: "ES" },
      name: "Barcelona",
    });
  });

  test("get data from api", async () => {
    // Mock fetch request

    // Create fake response (identical data structure that I get from json)

    render(<WeatherContainer fetchWeatherData={fakeWeatherdata} />);

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
});
