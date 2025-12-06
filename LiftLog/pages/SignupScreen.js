import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import AnimatedFade from '../components/AnimatedFade';
import { colors, spacing, fonts, common } from '../theme';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
      });

      setMessage("Account created successfully!");

      setTimeout(() => navigation.navigate("Login"), 900);

    } catch (error) {
      setMessage("Signup Error: " + error.message);
    }
  };

  return (
    <View style={common.screenContainer}>

      <AnimatedFade delay={100}>
        <Text style={styles.title}>Create Account</Text>
      </AnimatedFade>

      {message !== "" && (
        <AnimatedFade delay={200}>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </AnimatedFade>
      )}

      <AnimatedFade delay={300}>
        <TextInput
          style={common.input}
          placeholder="Full Name"
          placeholderTextColor={colors.textDarkMuted}
          value={name}
          onChangeText={setName}
        />
      </AnimatedFade>

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
        <TouchableOpacity style={common.primaryButton} onPress={handleSignup}>
          <Text style={common.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </AnimatedFade>

      <AnimatedFade delay={700}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.switch}>Already have an account? Login</Text>
        </TouchableOpacity>
      </AnimatedFade>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textLight,
    fontSize: fonts.h1,
    fontWeight: "bold",
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
