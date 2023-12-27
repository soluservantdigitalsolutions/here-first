const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const verifyToken = require("../middlewares/verifyToken");
const paystackService = require("../services/paystack.service");
const userService = require("../services/user.service");
const emailService = require("../utils/email.js");

router.get("/", userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

router.post("/initialize-payment", async (req, res) => {
  const { email, amount, phoneNumber } = req.body;
  try {
    const authorizationUrl = await paystackService.initializeTransaction(
      email,
      amount,
      phoneNumber
    );
    const subject = "Payment Authorization URL";
    const text = `Please follow this URL to authorize the payment: ${authorizationUrl}`;
    await emailService.sendEmail(email, subject, text);
    res.json({ authorizationUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/verify-payment/:userid/:reference", async (req, res) => {
  const { reference, userid } = req.params;
  try {
    const transaction = await paystackService.verifyTransaction(reference);
    if (transaction.status === "success") {
      await userService.updateWallet(userid, transaction.amount / 100); // Convert from pesewas to GHS
    }
    res.json({ transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
