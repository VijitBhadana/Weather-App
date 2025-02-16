import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import { WeatherData } from './types/weather';
import { getBackgroundImage, getWeatherRecommendations } from './utils/weatherUtils';
import { getWeatherData } from './utils/api';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
    if (!location.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await getWeatherData(location);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = weather 
    ? getBackgroundImage(weather.condition, weather.temperature)
    : 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80';

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
      }}
    >
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-md mb-12 pt-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {error && (
          <div className="bg-red-500/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : weather ? (
          <WeatherInfo 
            weather={weather} 
            recommendations={getWeatherRecommendations(weather.condition, weather.temperature)} 
          />
        ) : (
          <div className="text-white text-center mt-12">
            <h1 className="text-4xl font-light mb-4">Weather Forecast</h1>
            <p className="text-xl opacity-80">Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;