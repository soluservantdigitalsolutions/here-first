import * as Linking from "expo-linking";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { COLORS } from "../../constants/color";

function VerifyEmail() {
  return (
    <View style={styles.container}>
      <Button
        title="Please Click to Verify Your Email and Login"
        buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
        onPress={() => Linking.openURL("https://gmail.com")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default VerifyEmail;
