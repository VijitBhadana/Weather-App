export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  visibility: number;
  windSpeed: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  temperature: number;
  condition: string;
}

export interface WeatherRecommendation {
  clothes: string[];
  accessories: string[];
}