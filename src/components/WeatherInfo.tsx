import React from 'react';
import { Cloud, Droplets, Eye, Wind } from 'lucide-react';
import { WeatherData, WeatherRecommendation } from '../types/weather';
import { format } from 'date-fns';

interface WeatherInfoProps {
  weather: WeatherData;
  recommendations: WeatherRecommendation;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather, recommendations }) => {
  return (
    <div className="w-full max-w-4xl text-white">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-6xl font-light mb-2">{weather.temperature}°C</h1>
            <p className="text-2xl">{weather.location}</p>
            <p className="text-lg opacity-80">{format(new Date(), 'EEEE, dd MMM yyyy')}</p>
            <p className="text-4xl mt-4">{weather.condition}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="opacity-60" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="opacity-60" />
              <span>Visibility: {weather.visibility} mi</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="opacity-60" />
              <span>Wind: {weather.windSpeed} Km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="opacity-60" />
              <span>{weather.condition}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 backdrop-blur-md bg-black/20 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Clothes:</h3>
              <ul className="list-disc list-inside opacity-80">
                {recommendations.clothes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Accessories:</h3>
              <ul className="list-disc list-inside opacity-80">
                {recommendations.accessories.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {weather.forecast.map((day, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-black/20 p-4 rounded-xl text-center"
            >
              <p className="font-medium">{format(new Date(day.date), 'EEE')}</p>
              <p className="text-2xl my-2">{day.temperature}°C</p>
              <p className="opacity-80">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;