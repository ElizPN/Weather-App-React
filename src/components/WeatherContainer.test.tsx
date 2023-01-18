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

const mockResponse = {
  cod: 200,
  weather: [{ description: "clear sky" }],
  main: { temp: 15 },
  sys: { country: "ES" },
  name: "Barcelona",
};



  const fetchFakeWeatherdata = jest.fn().mockImplementation(() => {
    Promise.resolve(mockResponse);
  });

  test("get data from api", async () => {
  


    render(<WeatherContainer fetchWeatherData={fetchFakeWeatherdata} />);
    console.log(fetchFakeWeatherdata);

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
