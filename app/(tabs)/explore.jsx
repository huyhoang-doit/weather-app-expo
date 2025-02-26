import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches] = useState([
    "London, UK",
    "New York, USA",
    "Tokyo, Japan",
    "Paris, France",
    "Sydney, Australia",
  ]);

  const router = useRouter();

  const handleSearch = (value) => {
    setSearchQuery("");
    router.push({
      pathname: "/(tabs)/home",
      params: {
        location: value,
      },
    });
  };

  return (
    <LinearGradient colors={Colors.NIGHT} style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
          <Ionicons name="search" size={24} color={Colors.GRAY} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a city..."
          placeholderTextColor={Colors.GRAY}
          value={searchQuery}
          onChangeText={(value) => {
            setSearchQuery(value);
          }}
        />
      </View>

      <View style={styles.recentContainer}>
        <Text style={styles.recentTitle}>Recent Searches</Text>
        <FlatList
          data={recentSearches}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentItem}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/home",
                  params: {
                    location: item,
                  },
                });
              }}
            >
              <Ionicons name="location" size={24} color={Colors.YELLOW} />
              <Text style={styles.recentText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    marginTop: 40,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: "outfit",
  },
  recentContainer: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 18,
    color: Colors.GRAY,
    fontFamily: "outfit-bold",
    marginBottom: 15,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    marginBottom: 10,
  },
  recentText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: "outfit",
    marginLeft: 10,
  },
});

export default Explore;
