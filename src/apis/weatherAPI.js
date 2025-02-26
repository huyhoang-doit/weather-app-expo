const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export const weatherAPI = {
  getCurrentWeather: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  },

  getForecast: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  },
};
