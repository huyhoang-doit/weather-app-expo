import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import Header from "../../src/components/home/Header";
import { LinearGradient } from "expo-linear-gradient";
import HomeContent from "../../src/components/home/HomeContent";
import { weatherAPI } from "../../src/apis/weatherAPI";
import { isDaytime } from "../../src/utils/fn";
import { useLocalSearchParams } from "expo-router";

const Home = () => {
  const [isDay, setIsDay] = useState(true);
  const [curenLocation, setCurrenLocation] = useState("Ho Chi Minh City");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { location } = useLocalSearchParams();
  console.log("🚀 ~ Home ~ location:", location);

  useEffect(() => {
    if (location) {
      setCurrenLocation(location);
    }
  }, [location]);

  useEffect(() => {
    fetchWeatherData();
  }, [curenLocation]);

  useEffect(() => {
    if (weatherData) {
      setIsDay(
        isDaytime(
          weatherData.dt,
          weatherData.sys.sunrise,
          weatherData.sys.sunset,
          weatherData.timezone
        )
      );
    }
  }, [weatherData]);

  const fetchWeatherData = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await weatherAPI.getCurrentWeather(curenLocation);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
      Alert.alert(
        "Error",
        error.message === "City not found"
          ? `Could not find weather data for "${curenLocation}"`
          : error.message,
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={isDay ? Colors.DAY : Colors.NIGHT}
      style={styles.container}
    >
      <Header isDay={isDay} weatherData={weatherData} loading={loading} />
      <HomeContent isDay={isDay} weatherData={weatherData} loading={loading} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "90%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 15,
  },
  card: {
    width: "90%",
    padding: 30,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    color: Colors.YELLOW,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: Colors.YELLOW,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
});

export default Home;
