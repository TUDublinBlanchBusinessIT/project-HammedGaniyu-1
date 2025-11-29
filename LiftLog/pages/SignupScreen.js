import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signup Screen Works!</Text>
      <Button title="Test Button" onPress={() => alert('Button works')} />
    </View>
  );
}
