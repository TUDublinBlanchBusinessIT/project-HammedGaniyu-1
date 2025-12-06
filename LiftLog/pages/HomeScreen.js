import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setName(snap.data().name);
      }
    };

    fetchName();
  }, []);

  return (
    <Text style={{ color: "#FFF", fontSize: 28 }}>
      Welcome, {name}
    </Text>
  );
}
