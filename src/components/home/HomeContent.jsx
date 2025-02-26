import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { imageWeather } from "../../utils/fn";

const HomeContent = ({ isDay, weatherData, loading }) => {
  const router = useRouter();
  const image = imageWeather(weatherData?.weather[0].main, isDay);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.mainContent,
            { color: isDay ? Colors.BLACK : Colors.WHITE },
          ]}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text
            style={[
              styles.mainContent,
              { color: isDay ? Colors.BLACK : Colors.WHITE },
            ]}
          >
            {weatherData?.main?.temp.toFixed(1)}°C
          </Text>
          <Text style={styles.weatherStatus}>
            {weatherData?.weather[0]?.main}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: "/moreDetail",
                params: {
                  city: weatherData?.name,
                  weatherData: JSON.stringify(weatherData),
                },
              });
            }}
          >
            <Text style={styles.buttonText}>More Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.someContentContainer}>
        <View style={styles.someContentBox}>
          <Text style={styles.contentBoxText}>
            Wind {weatherData?.wind?.speed} m/s
          </Text>
          <FontAwesome5
            name="wind"
            size={16}
            color={isDay ? "black" : "white"}
          />
        </View>
        <View style={styles.someContentBox}>
          <Text style={styles.contentBoxText}>
            Humidity {weatherData?.main?.humidity}%
          </Text>
          <Ionicons name="water" size={16} color={isDay ? "black" : "white"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 350,
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
    paddingHorizontal: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
    marginHorizontal: -20,
  },
  mainContent: {
    fontSize: 60,
    fontFamily: "outfit-bold",
  },
  weatherStatus: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.ORANGE,
    textAlign: "left",
    marginLeft: 20,
  },
  someContentContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    marginHorizontal: -20,
  },
  someContentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
  },
  contentBoxText: {
    fontFamily: "outfit",
    fontSize: 14,
    marginRight: 5,
  },
});

export default HomeContent;
