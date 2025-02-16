import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = '7219ddf6282f9d436286f93831a3626b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    // Get current weather
    const currentWeatherResponse = await axios.get(
      `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
    );

    // Get forecast data
    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
    );

    const currentData = currentWeatherResponse.data;
    const forecastData = forecastResponse.data;

    // Get one forecast per day (every 8th item as the API returns 3-hour forecasts)
    const dailyForecasts = forecastData.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 7)
      .map((forecast: any) => ({
        date: new Date(forecast.dt * 1000).toISOString(),
        temperature: Math.round(forecast.main.temp),
        condition: forecast.weather[0].main
      }));

    return {
      location: `${currentData.name}, ${currentData.sys.country}`,
      temperature: Math.round(currentData.main.temp),
      condition: currentData.weather[0].main,
      humidity: currentData.main.humidity,
      visibility: Math.round(currentData.visibility / 1000), // Convert to kilometers
      windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      forecast: dailyForecasts
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      if (error.response?.status === 401) {
        throw new Error('API key is invalid or expired.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
    throw new Error('An unexpected error occurred');
  }
}