import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import AnimatedFade from "../components/AnimatedFade";
import { colors, spacing, fonts } from "../theme";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setName(snap.data().name);
    };

    loadName();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>

      {/* Welcome header */}
      <AnimatedFade delay={80}>
        <Text style={styles.title}>Welcome {name || "Lifter"}</Text>
      </AnimatedFade>

      {/* Hero banner */}
      <AnimatedFade delay={160}>
        <Image
          source={require("../assets/hero_gym.jpg")}
          style={styles.heroImage}
        />
      </AnimatedFade>

      {/* Subtitle */}
      <AnimatedFade delay={230}>
        <Text style={styles.subtitle}>Train smart. Track everything.</Text>
      </AnimatedFade>

      {/* Primary Add Workout button */}
      <AnimatedFade delay={300}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("AddWorkout")}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Add Workout</Text>
        </TouchableOpacity>
      </AnimatedFade>

      {/* Grid of options */}
      <View style={styles.grid}>

        {/* Coaching */}
        <AnimatedFade delay={350} style={{ width: "48%" }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Coaching")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardLabel}>Coaching</Text>
            <Text style={styles.cardText}>Smart advice based on your training</Text>
          </TouchableOpacity>
        </AnimatedFade>

        {/* History */}
        <AnimatedFade delay={420} style={{ width: "48%" }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("History")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardLabel}>History</Text>
            <Text style={styles.cardText}>Your logged workouts</Text>
          </TouchableOpacity>
        </AnimatedFade>

        {/* Profile */}
        <AnimatedFade delay={490} style={{ width: "48%" }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Profile")}
            activeOpacity={0.85}
          >
            <Text style={styles.cardLabel}>Profile</Text>
            <Text style={styles.cardText}>View/edit your account</Text>
          </TouchableOpacity>
        </AnimatedFade>

        {/* Placeholder for future feature */}
        <AnimatedFade delay={560} style={{ width: "48%" }}>
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <Text style={styles.cardLabel}>Coming Soon</Text>
            <Text style={styles.cardText}>More features ahead</Text>
          </TouchableOpacity>
        </AnimatedFade>
      </View>

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
    color: colors.textLight,
    fontSize: fonts.h1,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: spacing.md,
  },
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fonts.body,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 4,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.textLight,
    fontSize: fonts.h2,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    minHeight: 110,
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  cardLabel: {
    color: colors.textLight,
    fontSize: fonts.h3,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  cardText: {
    color: colors.textMuted,
    fontSize: fonts.small,
  },
});
