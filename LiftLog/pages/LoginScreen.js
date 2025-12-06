import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigation.navigate("Home");
      }, 1200);

    } catch (error) {
      setMessage("Login Error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LiftLog</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>

      {message !== "" && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    color: "#FFF",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#B3B3B3",
    fontSize: 18,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    marginBottom: 20,
    color: "#FFF",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#E10600",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchText: {
    color: "#FF453A",
    marginTop: 25,
    fontSize: 15,
  },
  messageBox: {
    backgroundColor: "#221111",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF0000",
    marginBottom: 20,
    width: "100%",
  },
  messageText: {
    color: "#FF453A",
    textAlign: "center",
    fontWeight: "bold",
  },
});
