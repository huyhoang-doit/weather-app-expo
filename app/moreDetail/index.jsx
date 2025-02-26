import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { weatherAPI } from "../../src/apis/weatherAPI";

const MoreDetail = () => {
  const { city, weatherData } = useLocalSearchParams();
  const dataWeather = JSON.parse(weatherData);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchForecastData();
  }, [city]);

  const fetchForecastData = async () => {
    try {
      const data = await weatherAPI.getForecast(city);
      const dailyData = data.list
        .filter((item, index) => index % 8 === 0)
        .slice(0, 5);
      setForecastData(dailyData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    const iconMap = {
      Clear: "sunny",
      Clouds: "cloudy",
      Rain: "rainy",
      Snow: "snow",
      Thunderstorm: "thunderstorm",
      default: "partly-sunny",
    };
    return iconMap[weatherMain] || iconMap.default;
  };

  if (loading) {
    return (
      <LinearGradient colors={Colors.NIGHT} style={styles.container}>
        <Text style={styles.headerTitle}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={Colors.NIGHT} style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={35} color="white" />
      </TouchableOpacity>
      <View style={styles.moreDetailContainer}>
        <Text style={styles.headerTitle}>Weather Forcast</Text>
        <Text style={styles.headerSubtitle}>{city}</Text>
      </View>
      <View style={styles.moreDetailBox}>
        <View style={styles.detailItem}>
          <View style={styles.dayContainer}>
            <Text style={styles.moreDetailText}>Kinh độ (lon)</Text>
          </View>
          <View style={styles.moreDetailIcon}>
            <Ionicons name="locate" size={18} color={Colors.YELLOW} />
            <Text style={styles.moreDetailText}>
              {dataWeather?.coord?.lon ?? "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <View style={styles.dayContainer}>
            <Text style={styles.moreDetailText}>Vĩ độ (lat)</Text>
          </View>
          <View style={styles.moreDetailIcon}>
            <Ionicons name="locate" size={18} color={Colors.YELLOW} />
            <Text style={styles.moreDetailText}>
              {dataWeather?.coord?.lat ?? "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <View style={styles.dayContainer}>
            <Text style={styles.moreDetailText}>Nhiệt độ (Temp)</Text>
          </View>
          <View style={styles.moreDetailIcon}>
            <FontAwesome5
              name="temperature-low"
              size={18}
              color={Colors.YELLOW}
            />
            <Text style={styles.moreDetailText}>
              {(dataWeather?.main?.temp - 273.15).toFixed(1) ?? "N/A"}°C
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <View style={styles.dayContainer}>
            <Text style={styles.moreDetailText}>Độ ẩm (Humidity)</Text>
          </View>
          <View style={styles.moreDetailIcon}>
            <Ionicons name="water" size={18} color={Colors.YELLOW} />
            <Text style={styles.moreDetailText}>
              {dataWeather?.main?.humidity ?? "N/A"}%
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <View style={styles.dayContainer}>
            <Text style={styles.moreDetailText}>Áp suất (Pressure)</Text>
          </View>
          <View style={styles.moreDetailIcon}>
            <Ionicons name="analytics" size={18} color={Colors.YELLOW} />
            <Text style={styles.moreDetailText}>
              {dataWeather?.main?.pressure ?? "N/A"} hPa
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <View style={styles.dayContainer}>
            <Text style={styles.moreDetailText}>Mô tả thời tiết</Text>
          </View>
          <View style={styles.moreDetailIcon}>
            <Ionicons
              name={getWeatherIcon(dataWeather?.weather?.[0]?.main)}
              size={18}
              color={Colors.YELLOW}
            />
            <Text style={styles.moreDetailText}>
              {dataWeather?.weather?.[0]?.description ?? "N/A"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.moreDetailContainer}>
        <Text style={styles.headerTitle}>5-Day Forecast</Text>
      </View>

      <ScrollView style={styles.forecastContainer}>
        {forecastData.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          return (
            <View key={index} style={styles.forecastItem}>
              <View style={styles.dayContainer}>
                <Text style={styles.dayText}>{dayName}</Text>
                <Text style={styles.weatherText}>{item.weather[0].main}</Text>
              </View>

              <View style={styles.tempContainer}>
                <Ionicons
                  name={getWeatherIcon(item.weather[0].main)}
                  size={24}
                  color={Colors.YELLOW}
                />
                <Text style={styles.tempText}>
                  {item.main.temp.toFixed(1)}°C
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  moreDetailContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  moreDetailBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  moreDetailText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: "outfit",
  },
  moreDetailIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  headerSubtitle: {
    fontSize: 18,
    color: Colors.GRAY,
    fontFamily: "outfit",
    marginTop: 5,
  },
  forecastContainer: {
    flex: 1,
  },
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  dayContainer: {
    flex: 1,
  },
  dayText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  weatherText: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "outfit",
    marginTop: 4,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tempText: {
    fontSize: 24,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
});

export default MoreDetail;
