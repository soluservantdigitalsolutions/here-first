const authService = require("../services/auth.service.js");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.signup(req, username, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const result = await authService.verifyEmail(token);

    // Send an HTML response
    res.send(`
      <h1>Email is verified</h1>
      <h3 href="/">Go back to app</h3>

      <style>
        body { text-align: center; padding: 20px; }
        h1 { color: green; }
      </style>
    `);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail
};
