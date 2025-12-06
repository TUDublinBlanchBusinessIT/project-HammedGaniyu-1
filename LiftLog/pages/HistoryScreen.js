import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function HistoryScreen() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    const q = query(
      collection(db, "workouts"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(logs);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      {workouts.length === 0 && (
        <Text style={styles.emptyText}>No workouts logged yet.</Text>
      )}

      {workouts.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.exercise}>{item.exercise}</Text>
          <Text style={styles.details}>
            {item.weight} kg · {item.sets} sets × {item.reps} reps
          </Text>
          <Text style={styles.date}>
            {item.date.toDate().toLocaleDateString()} — {item.date.toDate().toLocaleTimeString()}
          </Text>
        </View>
      ))}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D0D0D",
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#330000",
    shadowColor: "#E10600",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  exercise: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    color: "#FF453A",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  date: {
    color: "#BBB",
    fontSize: 14,
  },
});
