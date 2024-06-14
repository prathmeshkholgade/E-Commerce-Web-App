const passport = require("passport");
const User = require("../model/user");
const asyncWrap = require("../utils/asyncWrap");

module.exports.signUp = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const resUser = await User.register(newUser, password);
    req.login(resUser, (err) => {
      if (err) {
        return next(err);
      }
      const { hash, salt, ...userWithOutSesitiveInfo } = resUser.toObject();
      res.status(201).json(userWithOutSesitiveInfo);
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  console.log("this is user info");
  const { hash, salt, ...userWithOutSesitiveInfo } = req.user.toObject();
  res.status(200).json(userWithOutSesitiveInfo);
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("user logged in");
  });
};

module.exports.getUserData = (req, res) => {
  console.log("user:which currently logged in", req.user);
  if (req.isAuthenticated()) {
    res.status(200).json(req.user).populate("cart");
  } else {
    res.status(401).send({ error: "User is not authenticated" });
  }
};
