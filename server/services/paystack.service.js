const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const PAYSTACK_API_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Add your Paystack Secret Key here

const paystackService = axios.create({
  baseURL: PAYSTACK_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

const initializeTransaction = async (email, amount, phoneNumber) => {
  try {
    const response = await paystackService.post("/transaction/initialize", {
      email,
      amount: amount * 100, // Convert to pesewas
      currency: "GHS",
      channel: "mobile_money",
      mobile_money: {
        phone: phoneNumber,
        provider: "mtn", // Use 'mtn', 'tigo', or 'airtel' as appropriate
      },
    });
    return response.data.data.authorization_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const verifyTransaction = async (reference) => {
  try {
    const response = await paystackService.get(
      `/transaction/verify/${reference}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
};
