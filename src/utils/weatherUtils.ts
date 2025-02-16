import { WeatherRecommendation } from '../types/weather';

export const getBackgroundImage = (condition: string, temperature: number): string => {
  const timeOfDay = new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'day' : 'night';
  
  // Map OpenWeatherMap conditions to our background categories
  const getWeatherCategory = (condition: string): string => {
    condition = condition.toLowerCase();
    
    if (condition.includes('clear')) return 'clear';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rain';
    if (condition.includes('snow')) return 'snow';
    if (condition.includes('thunder')) return 'thunderstorm';
    if (condition.includes('haze') || condition.includes('mist') || condition.includes('fog')) return 'haze';
    return 'clear'; // default
  };

  const weatherCategory = getWeatherCategory(condition);
  
  const backgrounds: Record<string, Record<string, string>> = {
    clear: {
      day: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80',
      night: 'https://images.unsplash.com/photo-1532978879514-6cb2cac0c4c7?auto=format&fit=crop&w=1920&q=80'
    },
    cloudy: {
      day: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
      night: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80'
    },
    rain: {
      day: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80',
      night: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80'
    },
    snow: {
      day: 'https://images.unsplash.com/photo-1518983835933-69491f3f6f89?auto=format&fit=crop&w=1920&q=80',
      night: 'https://images.unsplash.com/photo-1518983835933-69491f3f6f89?auto=format&fit=crop&w=1920&q=80'
    },
    thunderstorm: {
      day: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
      night: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80'
    },
    haze: {
      day: 'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=1920&q=80',
      night: 'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=1920&q=80'
    }
  };

  return backgrounds[weatherCategory]?.[timeOfDay] || backgrounds.clear.day;
};

export const getWeatherRecommendations = (condition: string, temperature: number): WeatherRecommendation => {
  let clothes: string[] = [];
  let accessories: string[] = [];

  if (temperature < 10) {
    clothes = ['Heavy winter coat', 'Thermal underwear', 'Sweater', 'Warm pants'];
    accessories = ['Gloves', 'Scarf', 'Winter hat'];
  } else if (temperature < 20) {
    clothes = ['Light jacket', 'Long sleeve shirt', 'Jeans'];
    accessories = ['Light scarf'];
  } else if (temperature < 30) {
    clothes = ['T-shirt', 'Light pants or shorts'];
    accessories = ['Sunglasses', 'Cap'];
  } else {
    clothes = ['Light, breathable clothing', 'Shorts', 'Tank top'];
    accessories = ['Sunglasses', 'Sun hat', 'Sunscreen'];
  }

  const weatherCondition = condition.toLowerCase();
  if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
    accessories.push('Umbrella', 'Raincoat');
  } else if (weatherCondition.includes('snow')) {
    accessories.push('Snow boots', 'Waterproof gloves');
  } else if (weatherCondition.includes('fog') || weatherCondition.includes('haze')) {
    accessories.push('Face mask', 'Reflective gear');
  }

  return { clothes, accessories };
};