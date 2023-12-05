import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn";
import { COLORS } from "../../constants/color";
import { Avatar } from "react-native-elements";

import Section from "../../components/TabNavigator/Section";
import UserInfo from "../../components/UserInfo";

const Home = ({ navigation }) => {
  const tailwind = useTailwind();
  const dummyData = [
    { id: 1, title: "Deal 1", price: 100 },
    { id: 2, title: "Deal 2", price: 200 },
    { id: 3, title: "Deal 3", price: 300 },
    { id: 4, title: "Deal 3", price: 300 },
    { id: 5, title: "Deal 3", price: 300 },
    { id: 6, title: "Deal 3", price: 300 },

    // add more deals as needed
  ];

  const renderSection = ({ item }) => (
    <Section header={item.title} deals={item.data} />
  );

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <UserInfo navigation={navigation} />

            <View style={styles.greetView}>
              <Text style={styles.greetText}>Hi, Asante</Text>
            </View>
            <View style={styles.discover}>
              <View style={styles.discoverTextView}>
                <Text style={styles.discoverText}>Jump the Queue!</Text>
                <Text style={styles.discoverSubText}>
                  Order your favorite meal and cut the waiting time
                </Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => console.log("Button pressed")}
                >
                  <Text style={styles.buttonText}>Discover More</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Image
                  source={require("../../assets/discoverImage.png")}
                  style={styles.imageStyle}
                />
              </View>
            </View>
            <View>
              <Section header={"Top deals"} deals={dummyData} />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationText: {
    color: COLORS.PRIMARY,
    fontWeight: "900",
    fontSize: 20,
  },
  greetView: {},
  greetText: {
    fontWeight: "900",
    fontSize: 36,
  },
  discover: {
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  discoverText: {
    color: COLORS.SECONDARY,
    fontSize: 24,
    fontWeight: "700",
  },
  discoverSubText: {
    color: COLORS.SECONDARY,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.PRIMARY,
  },
  discoverTextView: {
    width: "60%",
  },
  SectionHeader: {
    fontWeight: "700",
    fontSize: 24,
  },
  sectionView: {
    marginTop: 20,
  },
});

export default Home;
