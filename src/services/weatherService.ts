const apiKey = "936a43fe9c1da3254004f3c7a1c14348";
const apiDomain = "https://api.openweathermap.org/"

export const fetchWeatherData = async (cityValue: string) => {
  const dataUrl = `${apiDomain}data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  return fetch(dataUrl).then((response: Response) => {
    return response.json();
  });
};
