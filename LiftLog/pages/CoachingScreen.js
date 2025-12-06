import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AnimatedFade from "../components/AnimatedFade";
import { colors, spacing, fonts, common } from "../theme";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

// Exercise → Muscle group mapping
const muscleGroups = {
  squat: "Legs",
  deadlift: "Back",
  bench: "Chest",
  row: "Back",
  curl: "Arms",
  press: "Shoulders",
  lunge: "Legs",
  pullup: "Back",
  dip: "Chest",
  fly: "Chest",
  pushup: "Chest",
};

export default function CoachingScreen() {
  const [goal, setGoal] = useState("Strength");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [routineVisible, setRoutineVisible] = useState(false);

  // Dropdown animation
  const dropdownHeight = useSharedValue(0);
  const animatedDropdownStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
    opacity: dropdownHeight.value === 0 ? 0 : 1,
  }));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    dropdownHeight.value = withTiming(dropdownOpen ? 0 : 150, { duration: 250 });
  };

  // Load workout history once
  useEffect(() => {
    const loadHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "workouts"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => d.data());
      setHistory(data);
    };

    loadHistory();
  }, []);

  // Update insights & recommendation whenever goal/history change
  useEffect(() => {
    generateInsights();
    generateRecommendation();
  }, [goal, history]);

  const detectMuscleGroup = (exercise) => {
    exercise = exercise.toLowerCase();
    for (const key in muscleGroups) {
      if (exercise.includes(key)) return muscleGroups[key];
    }
    return "Full Body";
  };

  const generateInsights = () => {
    if (history.length === 0) {
      setInsights(["No workout data yet. Start lifting!"]);
      return;
    }

    const counts = {};
    history.forEach((w) => {
      const group = detectMuscleGroup(w.exercise);
      counts[group] = (counts[group] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const strongest = sorted[0]?.[0];
    const weakest = sorted[sorted.length - 1]?.[0];

    setInsights([
      `Most trained: ${strongest}`,
      `Least trained: ${weakest}`,
      sorted.length > 2
        ? "Training balance improving."
        : "Try adding more variety.",
    ]);
  };

  const generateRecommendation = () => {
    if (goal === "Strength") {
      setRecommendation([
        "Squat – 5×5",
        "Bench Press – 4×6",
        "Barbell Row – 4×6",
        "Triceps Dips – 3×10",
      ]);
    } else if (goal === "Muscle Gain") {
      setRecommendation([
        "Incline Bench – 4×10",
        "Lat Pulldown – 4×12",
        "Leg Press – 4×12",
        "Shoulder Press – 3×15",
      ]);
    } else if (goal === "Fat Loss") {
      setRecommendation([
        "Circuit: Row + Push-ups + Squats – 10 min",
        "Burpees – 3×12",
        "Kettlebell Swings – 3×15",
        "Plank – 3×45s",
      ]);
    } else if (goal === "Beginner") {
      setRecommendation([
        "Goblet Squat – 3×12",
        "Push-ups – 3×10",
        "Dumbbell Row – 3×12",
        "Walking Lunges – 2×10",
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedFade delay={100}>
        <Text style={styles.title}>Coaching</Text>
      </AnimatedFade>

      {/* Goal Selector */}
      <AnimatedFade delay={200}>
        <Text style={styles.label}>Select your goal</Text>

        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{goal}</Text>
          <Text style={styles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.dropdownOptions, animatedDropdownStyle]}>
          {["Strength", "Muscle Gain", "Fat Loss", "Beginner"].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.option}
              onPress={() => {
                setGoal(g);
                toggleDropdown();
              }}
            >
              <Text style={styles.optionText}>{g}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </AnimatedFade>

      {/* Recent Trends */}
      <AnimatedFade delay={300}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Trends</Text>
          {insights.map((i, idx) => (
            <Text key={idx} style={styles.cardText}>
              • {i}
            </Text>
          ))}
        </View>
      </AnimatedFade>

      {/* Today's Recommendation */}
      <AnimatedFade delay={400}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Recommended Workout</Text>
          {recommendation.map((item, idx) => (
            <Text key={idx} style={styles.cardText}>
              • {item}
            </Text>
          ))}
        </View>
      </AnimatedFade>

      {/* Full Routine */}
      <AnimatedFade delay={500}>
        <TouchableOpacity
          style={styles.routineHeader}
          onPress={() => setRoutineVisible(!routineVisible)}
        >
          <Text style={styles.cardTitle}>Full Suggested Routine</Text>
          <Text style={styles.dropdownArrow}>
            {routineVisible ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {routineVisible && (
          <View style={[styles.card, { marginTop: spacing.sm }]}>
            <Text style={styles.cardText}>Warm-up: 5 minutes light cardio</Text>
            <Text style={styles.cardText}>Main lifts: based on your goal</Text>
            <Text style={styles.cardText}>Accessories: 2–3 isolation moves</Text>
            <Text style={styles.cardText}>Cooldown: stretch & mobility</Text>
          </View>
        )}
      </AnimatedFade>

      {/* Extra bottom space so last card isn't glued to edge */}
      <View style={{ height: spacing.xl }} />
    </View>
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
    marginBottom: spacing.md,
    textAlign: "center",
  },
  label: {
    color: colors.textMuted,
    fontSize: fonts.body,
    marginBottom: spacing.sm,
  },
  dropdown: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  dropdownText: {
    color: colors.textLight,
    fontSize: fonts.body,
  },
  dropdownArrow: {
    color: colors.accent,
    fontSize: fonts.h3,
  },
  dropdownOptions: {
    overflow: "hidden",
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    marginBottom: spacing.lg,
  },
  option: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  optionText: {
    color: colors.textLight,
  },
  card: {
    ...common.card,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.textLight,
    fontSize: fonts.h2,
    marginBottom: spacing.sm,
  },
  cardText: {
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  routineHeader: {
    ...common.card,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
