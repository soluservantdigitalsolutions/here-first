import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/color";
import PreferenceItem from "../../components/PreferenceItem";
import { getFoodDetails } from "../../utils/API/api";
import { getRestaurantDetails } from "../../utils/API/api.js";
import { CartContext } from "../../context/CartContext";

const FoodDetailsScreen = () => {
  const navigation = useNavigation();
  const [foodDetails, setFoodDetails] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const { params } = useRoute();
  const { foodId } = params;
  const [cart, setCart] = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  console.log(foodDetails);
  console.log("restaurant details", restaurantDetails);

  useEffect(() => {
    const itemInCart = cart.find(
      (cartItem) => cartItem.name === foodDetails?.name
    );
    setIsAdded(!!itemInCart);
  }, [cart, foodDetails]);

  useEffect(() => {
    getFoodDetails(foodId).then((response) => {
      setFoodDetails(response.data);
      getRestaurantDetails(response.data.restaurantId).then((response) => {
        setRestaurantDetails(response.data);
      });
    });
  }, [foodId]);

  useEffect(() => {
    getFoodDetails(foodId).then((response) => {
      setFoodDetails(response.data);
    });
  }, [foodId]);

 const addToCart = () => {
   try {
     const item = {
       id: foodDetails?._id,
       restaurantId: foodDetails?.restaurantId._id,
       image: foodDetails?.image,
       name: foodDetails?.name,
       price: foodDetails?.price,
       restaurantName: foodDetails?.restaurantId.name,
       description: foodDetails?.description,
       preferences: checkedPreferences, // add only checked preferences
       quantity: 1,
     };

     // Check if the item is already in the cart
     const itemInCart = cart.find((cartItem) => cartItem.name === item.name);

     if (itemInCart) {
       // If the item is in the cart, remove it
       setCart((currentCart) =>
         currentCart.filter((cartItem) => cartItem.name !== item.name)
       );
       setIsAdded(false);
     } else {
       // If the item is not in the cart, add it
       setCart((currentCart) => [...currentCart, item]);
       setIsAdded(true);
     }
     console.log("cart is", cart);
   } catch (error) {
     console.log(error);
   }
 };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <ImageBackground
            source={{
              uri: foodDetails?.image,
            }}
            style={styles.imageBackground}
          >
            {/* <View style={styles.overlay} /> */}

            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Icon
                  name="close"
                  size={20}
                  color={COLORS.PRIMARY}
                  onPress={() => navigation.goBack()}
                />
              </View>
              <View style={styles.iconBackground}>
                <Icon name="heart" size={20} color={COLORS.PRIMARY} />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.foodDetailsContainer}>
            <Text style={styles.foodName}>{foodDetails?.name}</Text>
            <Text style={styles.foodPrice}>${foodDetails?.price}</Text>
          </View>
          <View style={styles.restaurantDetailsContainer}>
            <Text style={styles.restaurantName}>
              {foodDetails?.restaurantId.name}
            </Text>
          </View>
          <View style={styles.foodDescriptionContainer}>
            <Text style={styles.foodDescription}>
              {foodDetails?.description}
            </Text>
          </View>
          <View style={styles.extraPreferencesContainer}>
            <Text style={styles.extraPreferencesTitle}>Extra Preferences</Text>
            <View style={styles.preferencesWrapper}>
              {foodDetails?.preferences[0]
                .split(",")
                .map((preference, index) => (
                  <PreferenceItem
                    key={index}
                    title={preference}
                    selected={true}
                  />
                ))}
            </View>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartButtonText}>
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  upperView: {
    flex: 0.3,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(46, 204, 64, 0.2)",
  },
  lowerView: {
    flex: 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconBackground: {
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 30,
    height: 30,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  foodDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  foodName: {
    fontWeight: "900",
    fontSize: 36,
    flexWrap: "wrap",
    flex: 1,
  },
  foodPrice: {
    color: COLORS.PRIMARY,
    fontWeight: "bold",
    fontSize: 36,
  },
  restaurantDetailsContainer: {
    paddingHorizontal: 20,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "300",
    textDecorationLine: "underline",
  },
  foodDescriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  foodDescription: {
    fontSize: 16,
    fontWeight: "400",
  },
  extraPreferencesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  extraPreferencesTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },
  preferencesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  addToCartButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 5,
    margin: 20,
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
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FoodDetailsScreen;
