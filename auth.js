const passport = require("passport");
const User = require("./models/userModel");
const createToken = require("./utils/createToken");
const ApiError = require("./utils/ApiError");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "181134601056-5e0csecn9ucj9ba2a4k072li9e3ikc4h.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.email });
        if (user) {
          
          // console.log(user);
          // User already exists in the database
          // const token = createToken(user._id);

          // console.log(token)
          return done(null, user);
        } else {
          return done(
            new ApiError(
              "This email not exist before, please singup and login again!",
              404
            )
          );
        }
      } catch (err) {
        return done(err);
      }
      // return done(null, profile); // in the top only email
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/**      User.findOne({ email: profile.email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(
            new ApiError(
              "This email not exist before, please singup and login again!",
              404
            )
          );
        }
      }); */
