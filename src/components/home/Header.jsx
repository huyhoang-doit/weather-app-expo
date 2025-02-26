import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getCurrentDate } from "../../utils/fn";

const Header = ({ isDay, weatherData }) => {
  const curentDate = getCurrentDate(weatherData?.dt, weatherData?.timezone);
  const location = weatherData?.name;
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.subtitle}>{curentDate}</Text>
        <Text
          style={[styles.title, { color: isDay ? Colors.BLACK : Colors.WHITE }]}
        >
          {location}
        </Text>
      </View>
      <View>
        <Ionicons
          name="location"
          size={40}
          color={!isDay ? "white" : "black"}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 15,
  },
  title: {
    fontSize: 32,
    textAlign: "left",

    fontFamily: "outfit-bold",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.WHITE,
    textAlign: "left",
    fontFamily: "outfit",
    marginBottom: 5,
  },
});

export default Header;
