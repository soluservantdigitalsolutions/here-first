import React, { useEffect, useState } from "react";
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
import { createRestaurant } from "../../utils/API/api";
import { getData } from "../../utils/Storage/storage";
import { Snackbar } from "react-native-paper";

export default function RestaurantForm({ navigation }) {
  const [logo, setLogo] = React.useState(null);
  const [coverPhoto, setCoverPhoto] = React.useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getData("user");
      console.log("user", user);
      setUserId(user.user._id);
    };

    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (
        !name ||
        !description ||
        !userId ||
        !logo ||
        !coverPhoto ||
        !address
      ) {
        setSnackbarMessage("All fields are required");
        setSnackbarVisible(true);
        return;
      }
      const newRestaurant = {
        name: name,
        description: description,
        userId: userId,
        profilePicture: logo,
        coverPicture: coverPhoto,
        address: address,
      };
      const response = await createRestaurant(newRestaurant);
      console.log(response.data);
      navigation.navigate("RestaurantProfile", { userId: userId });
      setSnackbarMessage("Restaurant created successfully");
      setSnackbarVisible(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("An error occurred");
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
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
            <Button
              title="Select Logo"
              buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
              onPress={selectLogo}
            />
            {logo && (
              <Image source={{ uri: logo }} style={{ width: 50, height: 50 }} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Button
              title="Select Cover Photo"
              buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
              onPress={selectCoverPhoto}
            />
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
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="info-circle" type="font-awesome" color="#808080" />

            <TextInput
              placeholder="Restaurant Description"
              style={styles.input}
              placeholderTextColor="#808080"
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Restaurant Address"
              style={styles.input}
              placeholderTextColor="#808080"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <Button
            color={COLORS.PRIMARY}
            title="Create Restaurant"
            onPress={handleSubmit}
            loading={loading}
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
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
          wrapperStyle={{
            backgroundColor: COLORS.PRIMARY,
          }}
        >
          {snackbarMessage}
        </Snackbar>
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
