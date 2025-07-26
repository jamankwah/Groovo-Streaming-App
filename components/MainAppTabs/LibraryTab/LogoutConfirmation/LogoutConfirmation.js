"use client"

import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Modal } from "react-native"

const LogoutConfirmationScreen = ({ navigation }) => {
  const handleCancel = () => {
    navigation.goBack()
  }

  

  const handleLogout = () => {
    console.log("User logged out")
    // Handle logout logic here
    // navigation.navigate('Login');
    navigation.navigate("Login")
  }

  return (
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.8)" />

          <View style={styles.modal}>
            <Text style={styles.title}>Logout</Text>
            <Text style={styles.message}>Are you sure you want to logout of Groovo?</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.8}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 24,
    width: 300,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#333333",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default LogoutConfirmationScreen
