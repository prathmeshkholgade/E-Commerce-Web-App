if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./model/Product");
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");
const asyncWrap = require("./utils/asyncWrap");
const session = require("express-session");
const productSchema = require("./utils/schema");
const LocalStrategy = require("passport-local");
const User = require("./model/user");
const passport = require("passport");
const { isLoggedIn, isOwner } = require("./middleware/middleware");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/user");

main()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceweb");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow credentials (cookies) to be sent
  })
);
const sessionOption = {
  secret: "supersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/", userRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not founud"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
  console.log(err);
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
