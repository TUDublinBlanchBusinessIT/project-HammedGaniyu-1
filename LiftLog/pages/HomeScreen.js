import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      
      <AnimatedFade delay={100}>
        <Text style={styles.title}>Welcome {name || "User"}</Text>
      </AnimatedFade>

      <AnimatedFade delay={200}>
        <Image 
          source={require("../assets/hero_gym.jpg")}
          style={styles.heroImage}
        />
      </AnimatedFade>

      <View style={styles.grid}>
        <AnimatedFade delay={300}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AddWorkout")}>
            <Text style={styles.cardText}>Add Workout</Text>
          </TouchableOpacity>
        </AnimatedFade>

        <AnimatedFade delay={400}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("History")}>
            <Text style={styles.cardText}>History</Text>
          </TouchableOpacity>
        </AnimatedFade>

        <AnimatedFade delay={500}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Profile</Text>
          </TouchableOpacity>
        </AnimatedFade>

        <AnimatedFade delay={600}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Coming Soon</Text>
          </TouchableOpacity>
        </AnimatedFade>
      </View>

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
    color: colors.textLight,
    fontSize: fonts.h1,
    fontWeight: "bold",
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: colors.card,
    paddingVertical: spacing.xl,
    borderRadius: 12,
    marginBottom: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  cardText: {
    color: colors.textLight,
    fontSize: fonts.h3,
    fontWeight: "bold",
  },
});
