import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddWorkoutScreen({ navigation }) {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!exercise || !weight || !sets || !reps) {
      setMessage("Please fill in all fields.");
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
        date: Timestamp.now()
      });

      setMessage("Workout saved successfully!");

      setTimeout(() => {
        navigation.navigate("Home");
      }, 1500);

    } catch (error) {
      setMessage("Error saving workout: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Add Workout</Text>

      {message !== "" && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Exercise Name (e.g. Bench Press)"
        placeholderTextColor="#777"
        value={exercise}
        onChangeText={setExercise}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        placeholderTextColor="#777"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Sets (e.g. 4)"
        placeholderTextColor="#777"
        value={sets}
        onChangeChangeText={setSets}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Reps per Set (e.g. 8)"
        placeholderTextColor="#777"
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0D0D0D",
    padding: 20 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    marginBottom: 20,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#E10600",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backText: {
    marginTop: 20,
    color: "#FF453A",
    textAlign: "center",
    fontSize: 16,
  },
  messageBox: {
    backgroundColor: "#122917",
    borderColor: "#4CD964",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  messageText: {
    color: "#4CD964",
    textAlign: "center",
    fontWeight: "bold",
  },
});
