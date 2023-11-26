import React from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text h3 style={{ marginBottom: 50 }}>Login</Text>
      <Input placeholder='Email' />
      <Input placeholder='Password' secureTextEntry={true} />
      <Button title="Login" onPress={() => {}} />
      <Button title="Don't have an account? Register" type="clear" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}