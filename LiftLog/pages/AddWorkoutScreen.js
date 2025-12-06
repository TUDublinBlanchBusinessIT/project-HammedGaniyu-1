import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import AnimatedFade from '../components/AnimatedFade';
import { colors, spacing, fonts, common } from '../theme';

export default function AddWorkoutScreen({ navigation }) {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!exercise || !weight || !sets || !reps) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "workouts"), {
        userId: user.uid,
        exercise,
        weight,
        sets,
        reps,
        date: Timestamp.now(),
      });

      setMessage("Workout saved!");
      setTimeout(() => navigation.navigate("Home"), 900);

    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <AnimatedFade delay={100}>
        <Text style={styles.title}>Add Workout</Text>
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
          placeholder="Exercise"
          placeholderTextColor={colors.textDarkMuted}
          value={exercise}
          onChangeText={setExercise}
        />
      </AnimatedFade>

      <AnimatedFade delay={400}>
        <TextInput
          style={common.input}
          placeholder="Weight (kg)"
          placeholderTextColor={colors.textDarkMuted}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </AnimatedFade>

      <AnimatedFade delay={500}>
        <TextInput
          style={common.input}
          placeholder="Sets"
          placeholderTextColor={colors.textDarkMuted}
          value={sets}
          onChangeText={setSets}
          keyboardType="numeric"
        />
      </AnimatedFade>

      <AnimatedFade delay={600}>
        <TextInput
          style={common.input}
          placeholder="Reps"
          placeholderTextColor={colors.textDarkMuted}
          value={reps}
          onChangeText={setReps}
          keyboardType="numeric"
        />
      </AnimatedFade>

      <AnimatedFade delay={700}>
        <TouchableOpacity style={common.primaryButton} onPress={handleSave}>
          <Text style={common.primaryButtonText}>Save Workout</Text>
        </TouchableOpacity>
      </AnimatedFade>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: fonts.h1,
    fontWeight: "bold",
    color: colors.textLight,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  messageBox: {
    backgroundColor: "#122917",
    borderColor: "#4CD964",
    borderWidth: 1,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  messageText: {
    color: "#4CD964",
    textAlign: "center",
    fontWeight: "bold",
  },
});
