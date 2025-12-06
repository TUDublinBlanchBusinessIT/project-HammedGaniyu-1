import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { colors, spacing, fonts } from "../theme";

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
      setWorkouts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      {workouts.length === 0 && (
        <Text style={styles.empty}>No workouts logged yet.</Text>
      )}

      {workouts.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.exercise}>{item.exercise}</Text>
          <Text style={styles.details}>
            {item.weight} kg · {item.sets} sets × {item.reps} reps
          </Text>
          <Text style={styles.date}>
            {item.date.toDate().toLocaleString()}
          </Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    flex: 1,
  },
  title: {
    fontSize: fonts.h1,
    fontWeight: "bold",
    color: colors.textLight,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  empty: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xl,
    fontSize: fonts.body,
  },
  card: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  exercise: {
    color: colors.textLight,
    fontSize: fonts.h2,
    fontWeight: "bold",
  },
  details: {
    color: colors.accent,
    fontSize: fonts.h3,
    marginTop: spacing.xs,
  },
  date: {
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
