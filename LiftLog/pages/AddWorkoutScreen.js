import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddWorkoutScreen({ navigation }) {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!exercise || !weight || !reps) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "workouts"), {
        userId: user.uid,
        exercise,
        weight,
        reps,
        date: Timestamp.now()
      });

      setMessage("Workout saved! Redirecting...");

      setTimeout(() => {
        navigation.navigate("Home");
      }, 1500);

    } catch (error) {
      setMessage("Error saving workout: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Workout</Text>

      {message !== "" && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Exercise Name (e.g. Bench Press)"
        value={exercise}
        onChangeText={setExercise}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40 },
  input: { width: '100%', padding: 15, borderWidth: 1, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  backText: { marginTop: 20, color: '#007AFF', fontSize: 16 },
  messageBox: {
    backgroundColor: "#d1ffd6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  messageText: {
    color: "#007A0A",
    textAlign: "center",
    fontWeight: "bold",
  },
});
