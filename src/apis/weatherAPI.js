const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export const weatherAPI = {
  getCurrentWeather: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      // Check if the API returned an error
      if (data.cod !== 200) {
        throw new Error(data.message || 'City not found');
      }

      return data;
    } catch (error) {
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }
      if (error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to weather service');
      }
      throw error;
    }
  },

  getForecast: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      // Check if the API returned an error
      if (data.cod !== '200') {
        throw new Error(data.message || 'City not found');
      }

      return data;
    } catch (error) {
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }
      if (error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to weather service');
      }
      throw error;
    }
  },
};
