import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../../constants/color";
import { Button } from "react-native-elements";
import { Input, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

export default function RestaurantForm({ navigation }) {
  const [logo, setLogo] = React.useState(null);
  const [coverPhoto, setCoverPhoto] = React.useState(null);

  const selectLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLogo(result.uri);
    }
  };

  const selectCoverPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCoverPhoto(result.uri);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>HF</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Create Your Restaurant on{" "}
            <Text style={{ color: COLORS.PRIMARY }}>HereFirst! </Text>{" "}
          </Text>
          <View style={styles.inputContainer}>
            <Button title="Select Logo" onPress={selectLogo} />
            {logo && (
              <Image source={{ uri: logo }} style={{ width: 50, height: 50 }} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Button title="Select Cover Photo" onPress={selectCoverPhoto} />
            {coverPhoto && (
              <Image
                source={{ uri: coverPhoto }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Icon name="cutlery" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Restaurant Name"
              style={styles.input}
              placeholderTextColor="#808080"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="info-circle" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Restaurant Description"
              style={styles.input}
              placeholderTextColor="#808080"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Restaurant Address"
              style={styles.input}
              placeholderTextColor="#808080"
            />
          </View>
          <Button
            color={COLORS.PRIMARY}
            title="Create Restaurant"
            onPress={() => navigation.navigate("RestaurantProfile")}
            containerStyle={{
              width: "100%",
              justifyContent: "center",
            }}
            buttonStyle={{
              backgroundColor: COLORS.PRIMARY,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>
              Don't want to create a Restaurant? Go back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(46, 204, 64, 0.5)",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.SECONDARY,
  },
  formContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});
