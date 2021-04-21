export type Weather = {
  cod: number;
  message: string;
  city: string;
  temp?: string | null;
  icon?: string | null;
  latitude?: string | null;
  longitude?: string | null;
};

export type WeatherForecastState = {
  weather: Weather;
  cities: string[];
};
