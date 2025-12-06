import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AnimatedFade from "../components/AnimatedFade";
import { colors, spacing, fonts, common } from "../theme";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");

      setTimeout(() => navigation.navigate("Home"), 800);
    } catch (error) {
      setMessage("Login Error: " + error.message);
    }
  };

  return (
    <View style={common.screenContainer}>
      
      <AnimatedFade delay={100}>
        <Text style={styles.title}>LiftLog</Text>
      </AnimatedFade>

      <AnimatedFade delay={200}>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </AnimatedFade>

      {message !== "" && (
        <AnimatedFade delay={300}>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </AnimatedFade>
      )}

      <AnimatedFade delay={400}>
        <TextInput
          style={common.input}
          placeholder="Email"
          placeholderTextColor={colors.textDarkMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </AnimatedFade>

      <AnimatedFade delay={500}>
        <TextInput
          style={common.input}
          placeholder="Password"
          placeholderTextColor={colors.textDarkMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </AnimatedFade>

      <AnimatedFade delay={600}>
        <TouchableOpacity style={common.primaryButton} onPress={handleLogin}>
          <Text style={common.primaryButtonText}>Login</Text>
        </TouchableOpacity>
      </AnimatedFade>

      <AnimatedFade delay={700}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.switch}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </AnimatedFade>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.h1,
    fontWeight: "bold",
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fonts.h3,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  switch: {
    color: colors.accent,
    marginTop: spacing.lg,
    fontSize: fonts.body,
    textAlign: "center",
  },
  messageBox: {
    backgroundColor: "#221111",
    borderLeftWidth: 3,
    borderColor: colors.primary,
    padding: spacing.sm,
    width: "100%",
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  messageText: {
    color: colors.accent,
    fontWeight: "bold",
    textAlign: "center",
  },
});
