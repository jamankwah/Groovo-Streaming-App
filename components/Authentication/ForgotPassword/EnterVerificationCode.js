"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native"
import { ChevronLeft } from "lucide-react-native"

export default function VerificationScreen({ navigation, route }) {
  const email = route.params?.email || "your email"
  const [code, setCode] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [isResendEnabled, setIsResendEnabled] = useState(false)
  const [focusedInputIndex, setFocusedInputIndex] = useState(-1)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef([])

  // Effect to auto-focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  useEffect(() => {
    let interval

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else {
      setIsResendEnabled(true)
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleCodeChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text.replace(/[^0-9]/g, "")

    setCode(newCode)

    if (text && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResendCode = () => {
    if (isResendEnabled) {
      Alert.alert("Code Resent", `A new verification code has been sent to ${email}.`)
      console.log("Requesting server to send code again for:", email)
      setTimer(60)
      setIsResendEnabled(false)
      setCode(["", "", "", ""])
      inputRefs.current[0].focus()
    }
  }

  const handleVerify = async () => {
    const fullCode = code.join("")
    if (fullCode.length === 4) {
      setIsVerifying(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsVerifying(false)

      if (fullCode === "1234") {
        Alert.alert("Verification Successful", "Your email has been verified!")
        console.log("Verification successful for code:", fullCode)
        navigation.navigate('ResetPassword')
      } else {
        Alert.alert("Verification Failed", "The code you entered is incorrect. Please try again.")
        console.log("Verification failed for code:", fullCode)
      }
    } else {
      Alert.alert("Error", "Please enter the complete 4-digit code.")
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityLabel="Go back">
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Please check your email</Text>
        <Text style={styles.description}>
          We've sent a code to <Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={[styles.codeInput, focusedInputIndex === index && styles.codeInputFocused]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedInputIndex(index)}
              onBlur={() => setFocusedInputIndex(-1)}
              keyboardType="numeric"
              maxLength={1}
              caretHidden={false}
              accessibilityLabel={`Code digit ${index + 1}`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleVerify}
          style={styles.verifyButton}
          accessibilityLabel="Verify button"
          disabled={isVerifying}
        >
          {isVerifying ? <ActivityIndicator color="#fff" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          {/* "Send code again" is now the pressable part */}
          <TouchableOpacity onPress={handleResendCode} disabled={!isResendEnabled || isVerifying}>
            <Text style={[styles.resendText, (!isResendEnabled || isVerifying) && styles.resendLinkDisabled]}>
              Send code again{" "}
            </Text>
          </TouchableOpacity>
          {/* The timer is now separate static text */}
          <Text style={[styles.resendLink, (!isResendEnabled || isVerifying) && styles.resendLinkDisabled]}>
            {formatTime(timer)}
          </Text>
        </View>
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
  emailText: {
    fontWeight: "bold",
    color: "#000",
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  codeInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  codeInputFocused: {
    borderColor: "#8A2BE2",
  },
  verifyButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#666",
  },
  resendLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  resendLinkDisabled: {
    color: "#555",
  },
})