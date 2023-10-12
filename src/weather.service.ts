import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherService {
  async getWeatherInfo(city: string, apiKey: string) {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', // Change to 'imperial' for Fahrenheit
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }
}