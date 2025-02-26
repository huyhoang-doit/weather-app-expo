import { weatherImages } from "../../constants/WeatherIMG";

export function getCurrentDate(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2025"
    month: "long", // "February"
    day: "numeric", // "25"
  });
}
// Example usage:
// const currentDate = getCurrentDate(data.dt, data.timezone);
// console.log("Current Date:", currentDate);

export function isDaytime(
  currentTimestamp,
  sunriseTimestamp,
  sunsetTimestamp,
  timezoneOffset
) {
  const currentTime = currentTimestamp + timezoneOffset;
  const sunriseTime = sunriseTimestamp + timezoneOffset;
  const sunsetTime = sunsetTimestamp + timezoneOffset;

  return currentTime >= sunriseTime && currentTime < sunsetTime;
}

export function imageWeather(weatherStatus, isDay) {
  if (isDay) {
    switch (weatherStatus) {
      case "Clouds":
        return weatherImages.Cloud;
      case "Clear":
        return weatherImages.Clear;
      case "Rain":
        return weatherImages.Rain;
      case "Thunders":
        return weatherImages.Thunder;
      default:
        return weatherImages.Clear;
    }
  } else {
    switch (weatherStatus) {
      case "Clouds":
        return weatherImages.N_cloud;
      case "Clear":
        return weatherImages.N_clear;
      case "Rain":
        return weatherImages.N_rain;
      case "Thunders":
        return weatherImages.N_thunder;
      default:
        return weatherImages.N_clear;
    }
  }

  return currentTime >= sunriseTime && currentTime < sunsetTime ? true : false;
}

// Example usage:
// const currentState = isDaytime(
//   data.dt,
//   data.sys.sunrise,
//   data.sys.sunset,
//   data.timezone
// );
// console.log("It's currently:", currentState);
