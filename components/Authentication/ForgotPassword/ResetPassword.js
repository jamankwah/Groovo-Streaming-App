"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native"
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native" // Import Eye and EyeOff icons

export default function ResetPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false)
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long.")
      return
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.")
      return
    }

    setIsResetting(true)
    console.log("Attempting to reset password...")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsResetting(false)

    Alert.alert("Success", "Your password has been reset successfully!")
    console.log("Password reset successful!")
    // In a real app, you would navigate to the login screen or home screen
    if (navigation && navigation.navigate) {
      navigation.navigate("Login") // Assuming a 'Login' screen exists
    }
  }

  const handleLogin = () => {
    console.log("Navigate to login")
    if (navigation && navigation.navigate) {
      navigation.navigate("Login")
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityLabel="Go back">
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.description}>Please type something you'll remember</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New password</Text>
          <View style={[styles.passwordInputContainer, isNewPasswordFocused && styles.inputFocused]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="must be 6 characters"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              onFocus={() => setIsNewPasswordFocused(true)}
              onBlur={() => setIsNewPasswordFocused(false)}
              accessibilityLabel="New password input"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
              accessibilityLabel={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm new password</Text>
          <View style={[styles.passwordInputContainer, isConfirmPasswordFocused && styles.inputFocused]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="repeat password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              accessibilityLabel="Confirm new password input"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
              accessibilityLabel={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleResetPassword}
          style={styles.resetButton}
          accessibilityLabel="Reset password button"
          disabled={isResetting}
        >
          {isResetting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetButtonText}>Reset password</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.loginPrompt}>
        <Text style={styles.loginPromptText}>
          Already have an account?{" "}
          <Text onPress={handleLogin} style={styles.loginLink} accessibilityLabel="Log in link">
            Log in
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  inputFocused: {
    borderColor: "#8A2BE2", // Purple border when focused
  },
  resetButton: {
    backgroundColor: "#8A2BE2", // Violet color
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginPrompt: {
    alignItems: "center",
    marginBottom: 30,
  },
  loginPromptText: {
    fontSize: 16,
    color: "#666",
  },
  loginLink: {
    color: "#000",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
})