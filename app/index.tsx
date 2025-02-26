import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { weatherImages } from "../constants/WeatherIMG";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={Colors.NIGHT} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.appName}>Weather App</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={weatherImages.Windy} style={styles.image} />
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.6)"]}
        style={styles.card}
      >
        <Text style={styles.title}>Hello Huy Hoang</Text>
        <Text style={styles.subtitle}>Let's see today's weather forecast.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontFamily: "outfit-bold",
    fontSize: 40,
    color: Colors.YELLOW,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
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
