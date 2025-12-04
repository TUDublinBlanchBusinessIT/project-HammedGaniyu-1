import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
      const user = userCredential.user;

      setMessage("Login successful! Redirecting...");

      
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);

    } catch (error) {
      setMessage("Login Error: " + Invalid);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {message !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
  input: { width: '100%', padding: 15, borderWidth: 1, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  switchText: { marginTop: 20, color: '#007AFF' },

  messageBox: {
    backgroundColor: "#d1e7ff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  messageText: {
    color: "#003d99",
    textAlign: "center",
    fontWeight: "bold",
  },
});
