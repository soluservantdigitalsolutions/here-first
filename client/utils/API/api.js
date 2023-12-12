import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = axios.create({
  baseURL: "http://192.168.32.60:3000/api/v1",
}); // replace with your server URL

API.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signup = (newUser) => API.post("/auth/signup", newUser);
export const signin = (user) => API.post("/auth/login", user);

export const createRestaurant = async (newRestaurant) => {
  const formData = new FormData();
  formData.append("name", newRestaurant.name);
  formData.append("description", newRestaurant.description);
  formData.append("userId", newRestaurant.userId);
  formData.append("address", newRestaurant.address);
  formData.append("profilePicture", {
    uri: newRestaurant.profilePicture,
    type: "image/jpeg", // or 'image/png' if the image is a PNG
    name: "profilePicture.jpg", // or '.png'
  });
  formData.append("coverPicture", {
    uri: newRestaurant.coverPicture,
    type: "image/jpeg", // or 'image/png'
    name: "coverPicture.jpg", // or '.png'
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return API.post("/restaurant/create-restaurant", formData, config);
};

export const checkUserHasRestaurant = (userId) =>
  API.get(`restaurant/restaurant-owner-check/${userId}`, {
    withCredentials: true,
  });

export const createFood = async (newFood) => {
  const formData = new FormData();
  formData.append("name", newFood.name);
  formData.append("description", newFood.description);
  formData.append("price", newFood.price);
  formData.append("preferences", newFood.preferences);
  formData.append("location", newFood.location);
  formData.append("image", {
    uri: newFood.image,
    type: "image/jpeg", // or 'image/png' if the image is a PNG
    name: "image.jpg", // or '.png'
  });
  formData.append("restaurantId", newFood.restaurantId);


  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return API.post("/food/create-food", formData, config);
};

export const getRestaurant = (id) =>
  API.get(`/restaurant/get-restaurant-by-user/${id}`);

export const getUser = (id) => API.get(`/users/${id}`);

export const getFoodsByRestaurant = (restaurantId) =>
  API.get(`/food/get-foods/${restaurantId}`);

  export const getFoodDetails = (foodId) => API.get(`/food/get-food/${foodId}`);

  export const getRestaurantDetails = (restaurantId) =>
    API.get(`/restaurant/get-restaurant-by-user/${restaurantId}`);