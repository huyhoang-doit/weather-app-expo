import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

const TabLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.YELLOW,
        tabBarInactiveTintColor: Colors.GRAY,
        tabBarStyle: {
          backgroundColor: Colors.NIGHT[0],
          elevation: 5,
          shadowOpacity: 0.1,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "outfit",
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={24} />
          ),
          tabBarLabel: "Home",
        }}
        onPress={() => {
          router.push({
            pathname: "/(tabs)/home",
            params: {
              location: "Ho Chi Minh City",
            },
          });
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={24} />
          ),
          tabBarLabel: "Explore",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
