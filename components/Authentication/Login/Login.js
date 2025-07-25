"use client"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native"
import { EyeOff, Eye } from "lucide-react-native"

export default function Login({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async () => {
    // Made async to simulate API call
    setEmailError("")
    setPasswordError("")

    let isValid = true
    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required.")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.")
      isValid = false
    }
    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required.")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.")
      isValid = false
    }

    if (isValid) {
      setIsLoggingIn(true) // Start loading animation
      console.log("Attempting to log in with:", { email, password, rememberMe })

      // Simulate login logic (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate 2-second network request

      setIsLoggingIn(false) // Stop loading animation

      Alert.alert("Login Successful", "You have successfully logged in!")
      // Here you would typically call your authentication API
      if (navigation && navigation.navigate) {
        navigation.navigate("HomeNavigation") // Assuming a 'Home' screen exists
      }
      setEmail("")
      setPassword("")
      setRememberMe(false)
    } else {
      Alert.alert("Login Failed", "Please correct the errors in the form.")
    }
  }

  const handleForgotPassword = () => {
    console.log("Navigating to Forgot Password screen...")
    if (navigation && navigation.navigate) {
      navigation.navigate("ForgotPassword")
    }
  }

  const handleSignUp = () => {
    console.log("Navigating to Sign Up screen...")
    if (navigation && navigation.navigate) {
      navigation.navigate("Register")
    }
  }

  const handleGoogleLogin = () => {
    console.log("Logging in with Google...")
    // Implement Google OAuth logic here
  }

  const handleAppleLogin = () => {
    console.log("Logging in with Apple...")
    // Implement Apple OAuth logic here
  }

  return (
    <ImageBackground source={require("../../../assets/bg.png")} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Header Section wrapped in SafeAreaView */}
        <SafeAreaView style={styles.safeAreaHeader}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign in to your Account</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        {/* Form Section */}
        <View style={styles.formBackground}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, emailError && styles.inputError]}
                placeholder="johndoe@gmail.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.passwordInputContainer, passwordError && styles.inputError]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="********"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                  accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={20} color="#888" /> : <EyeOff size={20} color="#888" />}
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkboxWrapper}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: rememberMe }}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Text style={styles.checkboxCheckmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordLink}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoggingIn}>
              {isLoggingIn ? (
                <ActivityIndicator color="white" /> // Show spinner when logging in
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>Or login with</Text>
              <View style={styles.separatorLine} />
            </View>
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={handleGoogleLogin}>
                <Image source={require("../../../assets/google.png")} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, styles.appleButton]} onPress={handleAppleLogin}>
                <Image source={require("../../../assets/apple.png")} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Terms and Conditions - MOVED HERE */}
          <Text style={styles.termsText}>
            By signing up, you agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{"\n"}
            <Text style={styles.termsLink}>Data Processing Agreement</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  safeAreaHeader: {
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 30,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  title: {
    color: "white",
    fontSize: 37,
    fontWeight: "bold",
    marginBottom: 8,
    width: "70%",
    textAlign: "left",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    color: "#eee",
    fontSize: 16,
  },
  signUpLink: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  formBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  form: {
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#333",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  passwordToggle: {
    padding: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  checkboxCheckmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxText: {
    color: "#333",
    fontSize: 14,
  },
  forgotPasswordLink: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center", // Center spinner
    marginBottom: 30,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  separatorText: {
    color: "#555",
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },
  socialButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  termsText: {
    color: "#555",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  termsLink: {
    fontWeight: "bold",
    color: "#555",
  },
})