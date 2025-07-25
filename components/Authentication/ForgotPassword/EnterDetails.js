'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    console.log('Triggering system to send verification code to:', email);

    // Navigate and pass the email as a param
    if (navigation && navigation.navigate) {
      navigation.navigate('EnterVerificationCode', { email });
    }
  };

  const handleLogin = () => {
    console.log('Navigate to login');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        accessibilityLabel="Go back"
        onPress={() => navigation.goBack()}>
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.description}>
          Don't worry! It happens. Please enter the email associated with your
          account.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Email address input"
          />
        </View>

        <TouchableOpacity
          onPress={handleSendCode}
          style={styles.sendCodeButton}
          accessibilityLabel="Send code button">
          <Text style={styles.sendCodeButtonText}>Send code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginPrompt}>
        <Text style={styles.loginPromptText}>
          Remember password?{' '}
          <Text
            onPress={handleLogin}
            style={styles.loginLink}
            accessibilityLabel="Log in link">
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  // backButtonText is no longer needed if using Lucide icon directly
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
    width: '90%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  sendCodeButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  sendCodeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginPromptText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
