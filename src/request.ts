export const fetchWeatherData = async (dataUrl: string) => {
  return fetch(dataUrl).then((response: Response) => {
    return response.json();
  });

};
