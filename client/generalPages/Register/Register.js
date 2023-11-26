import React from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/color.js'; 

export default function Register() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text h3 style={{ marginBottom: 50 }}>Register</Text>
      <Input placeholder='Username' />
      <Input placeholder='Email' />
      <Input placeholder='Password' secureTextEntry={true} />
      <Button title="Register" onPress={() => {}} />
      <Button title="Already have an account? Login" type="clear" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}