import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../constants/color.js";

const PreferenceItem = ({ title, initialSelected }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handlePress = () => {
    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: selected ? COLORS.GREEN : COLORS.BLACK },
      ]}
      onPress={handlePress}
    >
      {selected && <Icon name="check" size={20} color={COLORS.GREEN} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    gap: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default PreferenceItem;
