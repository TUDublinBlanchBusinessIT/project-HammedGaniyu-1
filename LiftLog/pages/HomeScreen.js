import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    const fetchName = async () => {
      if (!user) return;
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setName(snap.data().name || '');
        }
      } catch (err) {
        console.log('Error loading name:', err.message);
      }
    };

    fetchName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={require('../assets/hero_gym.png')} // or .jpg depending on your file
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroTextWrapper}>
          <Text style={styles.heroTitle}>LiftLog</Text>
          <Text style={styles.heroSubtitle}>Train Hard. Track Smart.</Text>
        </View>
      </View>

      {/* Welcome Card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Welcome</Text>
        <Text style={styles.cardMainText}>
          {name ? name : (user?.email || 'Athlete')}
        </Text>
        <Text style={styles.cardSubText}>Ready to log your next session?</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text style={styles.buttonText}>Add Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>View Workout History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonSecondaryText}>Profile (coming soon)</Text>
        </TouchableOpacity>
      </View>

      {/* Logout at bottom */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  heroContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  heroTextWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  heroTitle: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FF453A',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#E10600',
  },
  cardLabel: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 4,
  },
  cardMainText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSubText: {
    color: '#888',
    fontSize: 14,
    marginTop: 6,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#E10600',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondaryText: {
    color: '#B3B3B3',
    fontSize: 15,
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#FF453A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
