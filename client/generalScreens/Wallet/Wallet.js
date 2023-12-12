import React, { useState } from "react";
import {
  View,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/color";

export default function Wallet() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTransaction = async () => {
    // Handle the transaction here
  };

  return (
   <>
   
   
   </>
  );
}

const styles = StyleSheet.create({
  
});
