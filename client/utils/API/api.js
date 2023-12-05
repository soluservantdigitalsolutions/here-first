import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.144.60:3000/api/v1" }); // replace with your server URL


export const signup = (newUser) => API.post("/auth/signup", newUser);
export const signin = (user) => API.post("/auth/login", user);
