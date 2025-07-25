"use client"

import { useState } from "react"
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  Platform,
  ImageBackground 
} from "react-native"
import { ChevronLeft } from "lucide-react-native"

export default function OnboardingScreen2({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1) // Assuming this is the second onboarding screen

  const handleBack = () => {
    console.log("Navigating back to previous onboarding screen...")
    if (navigation && navigation.goBack) {
      navigation.goBack()
    }
  }

  const handleGetStarted = () => {
    console.log("Navigating to main app or login screen...")
    if (navigation && navigation.navigate) {
      navigation.navigate("Login") // Assuming a 'Login' screen exists
    }
  }

  return (
    <ImageBackground 
      source={require("../../assets/bg.png")} 
      style={styles.backgroundImage}
      resizeMode="cover" 
    >
      {/* Optional overlay for better text readability */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          {/* Back Button */}
          <TouchableOpacity onPress={handleBack} style={styles.backButton} accessibilityLabel="Go back">
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Dark shadow-like circle around the image */}
            <View style={styles.imageBackgroundCircle}>
              <Image
                source={require("../../assets/Illustration3.png")}
                style={styles.magnifyingGlassImage}
              />
            </View>
            <Text style={styles.title}>Find the best</Text>
            <Text style={styles.description}>
              Find your favorite songs or even try listening to those recommended.
            </Text>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
              <View style={[styles.paginationDot, currentPage === 0 && styles.paginationDotActive]} />
              <View style={[styles.paginationDot, currentPage === 1 && styles.paginationDotActive]} />
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity onPress={handleGetStarted} style={styles.getStartedButton} accessibilityLabel="Get Started">
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)", 
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  imageBackgroundCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  magnifyingGlassImage: {
    width: 290,
    height: 290,
    resizeMode: "contain",
  },
  title: {
    color: "#FFFFFF", // Changed to white for better visibility
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Text shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    color: "#F0F0F0", // Light grey for better contrast
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Text shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "#8A2BE2",
    width: 30,
  },
  getStartedButton: {
    backgroundColor: "#8A2BE2",
    width: "90%",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
})