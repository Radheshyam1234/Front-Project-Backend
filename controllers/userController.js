const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utilities/generateToken");
const { JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user !== null) {
      return res.json({
        message: "Account already exists for this email",
      });
    }

    hashedPassword = await bcrypt.hash(password, 12);

    const NewUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await NewUser.save();

    const token = generateToken(NewUser._id);

    res.status(201).json({
      response: {
        NewUser,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: error.message,
    });
  }
};

const AuthenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).json({ message: "Email or password is incorrect!" });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            res.status(201).json({
              response: {
                user,
                token,
              },
            });
          } else {
            res
              .status(403)
              .json({ message: "Email or password is incorrect!" });
          }
        })

        .catch((error) => {
          console.log(error);
          res.status(403).json({ message: "Email or password is incorrect!" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: error.message,
    });
  }
};

const getUserDetailsFromDb = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json({
      response: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const editUserProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { firstName, lastName },
      },
      { new: true }
    ).exec((err, user) => {
      if (user) {
        res.status(200).json({
          response: {
            user,
          },
        });
      } else console.log(err);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  createNewUser,
  AuthenticateUser,
  getUserDetailsFromDb,
  editUserProfile,
};
