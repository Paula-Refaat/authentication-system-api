const express = require("express");
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/authServices");

const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyPassResetCodeValidator,
  resetPasswordValidator,
} = require("../utils/validators/authValidator");

// Import Facebook authentication strategy
const FacebookStrategy = require("passport-facebook").Strategy;

// Create a limiter for login requests
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: "Too many login attempts. Please try again later.",
});

// Create a limiter for forgot password requests
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 forgot password requests per windowMs
  message: "Too many forgot password attempts. Please try again later.",
});

const router = express.Router();

// Trust the proxy
router.set('trust proxy', true);

// Route to start the Google authentication process
router.get(
  "/google",
  loginLimiter,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google will redirect to after authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }), // Disable sessions
  (req, res) => {
    // Assuming your strategy attaches the JWT to the user object
    if (req.user && req.user.token) {
      // Redirect the user or send the token directly
      // Example: Redirect with the token in query params
      res.redirect(`/your-success-page?token=${req.user.token}`);
    } else {
      res.redirect("/login?error=authenticationFailed");
    }
  }
);

// Route to start the Facebook authentication process
router.get(
  "/facebook",
  loginLimiter,
  passport.authenticate("facebook", { scope: ["email"] })
);

// Callback route that Facebook will redirect to after authentication
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }), // Disable sessions
  (req, res) => {
    // Assuming your strategy attaches the JWT to the user object
    if (req.user && req.user.token) {
      // Redirect the user or send the token directly
      // Example: Redirect with the token in query params
      res.redirect(`/your-success-page?token=${req.user.token}`);
    } else {
      res.redirect("/login?error=authenticationFailed");
    }
  }
);

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, loginLimiter, login);
router.post(
  "/forgotpassword",
  forgotPasswordLimiter,
  forgotPasswordValidator,
  forgotPassword
);
router.post(
  "/verifyResetCode",
  verifyPassResetCodeValidator,
  verifyPassResetCode
);
router.put("/resetPassword", resetPasswordValidator, resetPassword);

module.exports = router;
