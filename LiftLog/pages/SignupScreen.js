import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user name + email in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email
      });

      Alert.alert(
        "Account Created",
        "Your account was created successfully.",
        [
          { text: "OK", onPress: () => navigation.navigate("Login") }
        ]
      );

    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#0D0D0D"
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 40, 
    color: "#FFF" 
  },
  input: { 
    width: "100%", 
    padding: 15, 
    borderWidth: 1, 
    borderColor: "#333", 
    borderRadius: 10, 
    marginBottom: 20,
    color: "#FFF",
    backgroundColor: "#1A1A1A"
  },
  button: { 
    backgroundColor: "#E10600", 
    padding: 15, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center" 
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  switchText: { marginTop: 20, color: "#FF453A" },
});
