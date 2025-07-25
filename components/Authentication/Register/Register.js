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
  KeyboardAvoidingView,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native"
import { EyeOff, Eye, CalendarDays, ChevronDown } from "lucide-react-native"
import CountryPicker from "react-native-country-picker-modal"

export default function App({ navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("") // Will be manually typed
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // Country picker states
  const [countryCode, setCountryCode] = useState("GH") // Default to Ghana
  const [countryCallingCode, setCountryCallingCode] = useState("233") // Default for Ghana
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [isRegistering, setIsRegistering] = useState(false) // New state for loading animation

  // Helper function to format date as DD/MM/YYYY
  const formatDOBInput = (text) => {
    const cleaned = text.replace(/\D/g, "") // Remove non-digits
    let formatted = ""
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, 2)
      if (cleaned.length > 2) {
        formatted += "/" + cleaned.substring(2, 4)
        if (cleaned.length > 4) {
          formatted += "/" + cleaned.substring(4, 8)
        }
      }
    }
    return formatted.substring(0, 10) // Limit to DD/MM/YYYY length
  }

  const handleRegister = async () => {
    // Clear only the password error initially
    setPasswordError("")
    const missingFields = []
    if (!firstName.trim()) missingFields.push("First Name")
    if (!lastName.trim()) missingFields.push("Last Name")
    if (!email.trim()) missingFields.push("Email")
    if (!dateOfBirth.trim()) missingFields.push("Date of Birth")
    if (!phoneNumber.trim()) missingFields.push("Phone Number")
    if (!password.trim()) missingFields.push("Password")

    if (missingFields.length > 0) {
      Alert.alert("Missing Information", "Please fill all the fields.")
      return
    }

    let isValid = true
    // Email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.")
      isValid = false
    }
    // Date of Birth format and validity validation
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (!dobRegex.test(dateOfBirth)) {
      Alert.alert("Invalid Date", "Please enter date in DD/MM/YYYY format.")
      isValid = false
    } else {
      const [day, month, year] = dateOfBirth.split("/").map(Number)
      const parsedDate = new Date(year, month - 1, day) // Month is 0-indexed
      if (
        isNaN(parsedDate.getTime()) ||
        parsedDate.getDate() !== day ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getFullYear() !== year
      ) {
        Alert.alert("Invalid Date", "Invalid date entered.")
        isValid = false
      } else if (parsedDate > new Date()) {
        Alert.alert("Invalid Date", "Date cannot be in the future.")
        isValid = false
      }
    }
    // Password length validation (this is the only one that shows inline error)
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.")
      isValid = false
    }

    if (!isValid) {
      // The password length error will be displayed inline. Other errors will be alerts.
      return
    }

    // If all validations pass, start registration process
    setIsRegistering(true) // Start loading animation
    console.log("Attempting to register with:", {
      firstName,
      lastName,
      email,
      dateOfBirth,
      fullPhoneNumber: `+${countryCallingCode}${phoneNumber}`, // Combined phone number
      password,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsRegistering(false) // Stop loading animation

    Alert.alert("Registration Successful", "Your account has been created!")
    // In a real app, you would call your registration API here
    if (navigation && navigation.navigate) {
      navigation.navigate("Login") // Assuming a 'Login' screen exists
    }
    setFirstName("")
    setLastName("")
    setEmail("")
    setDateOfBirth("")
    setPhoneNumber("")
    setPassword("")
  }

  const handleSignIn = () => {
    console.log("Navigating to Sign In screen...")
    if (navigation && navigation.navigate) {
      navigation.navigate("Login") // Assuming a 'Login' screen exists
    }
  }

  return (
    <ImageBackground source={require("../../../assets/bg.png")} style={styles.backgroundImage}>
    <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Header Section wrapped in SafeAreaView */}
        <SafeAreaView style={styles.safeAreaHeader}>
          <View style={styles.header}>
            <Text style={styles.title}>Create your Account</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Already have an account? </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.signUpLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        {/* Form Section */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust as needed
        >
          <View style={styles.formBackground}>
            <View style={styles.form}>
              <View style={styles.nameInputsContainer}>
                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.input} // Removed conditional error style
                    placeholder="Lois"
                    placeholderTextColor="#888"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input} // Removed conditional error style
                    placeholder="Becket"
                    placeholderTextColor="#888"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input} // Removed conditional error style
                  placeholder="loisbecket@gmail.com"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Birth of date</Text>
                <View style={styles.inputWithIconContainer}>
                  <TextInput
                    style={styles.inputWithIcon}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#888"
                    keyboardType="numeric" // Restrict to numeric input
                    value={dateOfBirth}
                    onChangeText={(text) => setDateOfBirth(formatDOBInput(text))}
                    maxLength={10} // Max length for DD/MM/YYYY
                  />
                  <CalendarDays size={20} color="#888" style={styles.inputIcon} />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                  <CountryPicker
                    onSelect={(country) => {
                      setCountryCode(country.cca2)
                      setCountryCallingCode(country.callingCode[0])
                    }}
                    countryCode={countryCode}
                    withFlag
                    withCallingCode
                    withEmoji
                    onClose={() => setCountryPickerVisible(false)}
                    onOpen={() => setCountryPickerVisible(true)}
                    visible={countryPickerVisible}
                    // Custom button to trigger the picker and display selected country info
                    renderFlagButton={(props) => (
                      <TouchableOpacity onPress={props.onOpen} style={styles.countryCodeDisplay}>
                        {props.countryCode && (
                          <Image
                            source={{ uri: `https://flagcdn.com/w20/${props.countryCode.toLowerCase()}.png` }}
                            style={styles.flagIcon}
                          />
                        )}
                        {props.withCallingCode && props.countryCallingCode && (
                          <Text style={styles.callingCodeText}>{props.countryCallingCode}</Text>
                        )}
                        <ChevronDown size={16} color="#888" style={styles.dropdownIcon} />
                      </TouchableOpacity>
                    )}
                  />
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="(233) 726-****"
                    placeholderTextColor="#888"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Set Password</Text>
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
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isRegistering}>
                {isRegistering ? (
                  <ActivityIndicator color="white" /> // Show spinner when registering
                ) : (
                  <Text style={styles.registerButtonText}>Register</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  safeAreaHeader: {
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 20,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
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
  keyboardAvoidingView: {
    flex: 1,
  },
  formBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 30,
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
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
  nameInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
  },
  inputWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  inputIcon: {
    marginLeft: 8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },
  countryCodeDisplay: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    marginRight: 10,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 5,
    resizeMode: "contain",
  },
  callingCodeText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    paddingRight: 16,
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
  registerButton: {
    backgroundColor: "#8B5CF6", // Purple color
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center", // Center spinner
    marginBottom: 10,
    marginTop: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})