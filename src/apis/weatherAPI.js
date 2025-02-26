const API_KEY = "1c74b553eeedfd71338c5ddbc364e5ca";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

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