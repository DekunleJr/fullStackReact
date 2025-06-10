const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
require("./models/user"); // Ensure the user model is registered with mongoose
require("./services/passport"); // Ensure this is imported to initialize passport strategies

const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(MONGO_URI)
  .then((result) => {
    app.listen(PORT);
    console.log(`connected on ${PORT}`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
    console.log("Error Stack:", err.stack);
  });
