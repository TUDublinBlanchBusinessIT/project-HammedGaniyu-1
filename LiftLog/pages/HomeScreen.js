import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Hero Image */}
      <Image 
        source={require("../assets/hero_gym.jpg")} 
        style={styles.heroImage} 
        resizeMode="cover"
      />

      <Text style={styles.title}>LiftLog</Text>
      <Text style={styles.subtitle}>Train Hard. Track Smart.</Text>

      {/* Dashboard Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome back</Text>
        <Text style={styles.cardEmail}>{user?.email}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddWorkout")}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("History")}>
        <Text style={styles.buttonText}>Workout History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#B3B3B3",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#E10600",
  },
  cardTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cardEmail: {
    fontSize: 14,
    color: "#B3B3B3",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#E10600",
    padding: 18,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  logoutText: {
    color: "#FF453A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
