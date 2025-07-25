import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Search, LibraryBig } from "lucide-react-native";
import LibraryTab from '../MainAppTabs/LibraryTab/Library/Library'
import HomeTab from '../MainAppTabs/HomeTab/HomeScreen'
import SearchTab from '../MainAppTabs/SearchTab/SearchScreen'

// Dummy Screen Components
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <HomeTab />
    </View>
  );
}

function LibraryScreen() {
  return (
    <View style={styles.screenContainer}>
      <LibraryTab />
    </View>
  );
}

// Navigators
const Tab = createBottomTabNavigator();

// App Root Component
export default function App({navigation}) {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let IconComponent

            if (route.name === "Home") {
              IconComponent = Home
            } else if (route.name === "Search") {
              IconComponent = Search
            } else if (route.name === "Your Library") {
              IconComponent = LibraryBig
            }

            return IconComponent
              ? React.createElement(IconComponent, {
                  size,
                  color,
                  strokeWidth: focused ? 3 : 1.5,
                  fill: focused ? color : "none",
                })
              : null
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#A0A0A0",
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchTab} />
        <Tab.Screen name="Your Library" component={LibraryScreen} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000000",
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
})