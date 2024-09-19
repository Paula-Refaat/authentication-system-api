const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const multer = require("multer"); // Import multer
const cors = require("cors");

dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/errorMiddleware");

const authRoute = require("./routes/authRoute");

dbConnection();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//enable other domains access your application
app.use(
  cors({
    origin: true, // dynamically set the origin based on request origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// Configure multer to handle form-data (optional storage)
const upload = multer();

// Mount Routes with multer middleware for form-data
app.use("/api/v1/auth", upload.none(), authRoute);

//Mount Routes
// app.use("/api/v1/auth", authRoute);

// Initialize Passport
app.use(passport.initialize());

// Handel unhandelling Routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't found this Route : ${req.originalUrl}`, 400));
});

// Global error handelling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection Error : ${error.name} | ${error.message}`);
  server.close(() => {
    console.error("Shutting down.... ");
    process.exit(1);
  });
});
