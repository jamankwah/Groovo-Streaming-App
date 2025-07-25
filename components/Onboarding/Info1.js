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

export default function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0) // Assuming this is the first of multiple onboarding screens

  const handleSkip = () => {
    console.log("Skipping onboarding...")
    // Navigate to the main app screen or login screen
    if (navigation && navigation.navigate) {
      navigation.navigate("Login") // Assuming a 'Login' screen exists
    }
  }

  const handleNext = () => {
    console.log("Navigating to next onboarding screen or main app...")
    if (navigation && navigation.navigate) {
      navigation.navigate("Onboarding2") // Assuming a 'Login' screen exists
    }
  }

  return (
    <ImageBackground 
      source={require("../../assets/bg.png")} // Replace with your background image path
      style={styles.backgroundImage}
      resizeMode="cover" // You can also use "stretch", "contain", "center", or "repeat"
    >
      {/* Optional overlay for better text readability */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          {/* Skip Button */}
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton} accessibilityLabel="Skip onboarding">
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Dark shadow-like circle around the image */}
            <View style={styles.imageBackgroundCircle}>
              <Image source={require("../../assets/Illustration1.png")} style={styles.headphonesImage} />
            </View>
            <Text style={styles.title}>Listen to music</Text>
            <Text style={styles.description}>
              You can listen to more than 1 Million songs and podcasts on Groovo For Free.
            </Text>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
              <View style={[styles.paginationDot, currentPage === 0 && styles.paginationDotActive]} />
              <View style={[styles.paginationDot, currentPage === 1 && styles.paginationDotActive]} />
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity onPress={handleNext} style={styles.nextButton} accessibilityLabel="Next">
            <Text style={styles.nextButtonText}>Next</Text>
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
    backgroundColor: "transparent",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
    borderRadius: 15,
  },
  skipButtonText: {
    color: "#FFFFFF", // Changed to white for better visibility on background
    fontSize: 18,
    fontWeight: "bold",
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
  headphonesImage: {
    width: 290,
    height: 300,
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
  nextButton: {
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
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
})