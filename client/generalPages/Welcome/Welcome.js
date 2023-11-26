import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text h1 style={{ color: '#1976d2', marginBottom: 50 }}>Welcome!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} containerStyle={{ width: '100%', padding: 10 }} buttonStyle={{ backgroundColor: '#1976d2' }} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} containerStyle={{ width: '100%', padding: 10 }} buttonStyle={{ backgroundColor: '#1976d2' }} />
    </View>
  );
}