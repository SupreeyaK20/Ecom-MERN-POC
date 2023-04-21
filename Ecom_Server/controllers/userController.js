const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../middleware/mailHandler");
const User = require("../models/userModel");
const sendResetMail = require("../middleware/resetMailHandler");

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
      if (!username || !email || !phone || !password) {
        res.status(400);
        return res.json({ error: "All fields are mandatory!" });
      }

      const userAvailableEmail = await User.findOne({ email });
      const userAvailablePhone = await User.findOne({ phone });

      if (userAvailableEmail && userAvailablePhone) {
        res.status(409);
        return res.json({
          error: "User already registered with this email and phone number!",
        });
      } else if (userAvailableEmail) {
        res.status(409);
        return res.json({ error: "User already registered with this email!" });
      } else if (userAvailablePhone) {
        res.status(409);
        return res.json({
          error: "User already registered with this phone number!",
        });
      }

      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
      });
      if (user) {
        await sendMail(user);

        return res.status(201).json({ message: "User Created" });
      } else {
        res.status(400);
        return res.json({ error: "User data is not valid" });
      }
    } catch (error) {
      res.status(500);
      return res.json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404);
      return res.json({ error: "All fields are mandatory!" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
        },
        process.env.MY_SECRETE_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ accessToken });
    } else {
      res.status(404);
      return res.json({ error: "Email or password not correct" });
    }
  },

  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
    if (!users) {
      return res.json({ error: "User Not Found" });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },

  profile: async (req, res) => {
    res.json(req.user);
  },

  updateProfile: async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    if (!data) {
      res.status(404);
      return res.json({ error: "Add required fields" });
    }

    const updatedProfile = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    res.status(200).json(updatedProfile);
  },

  updateUserData: async (req, res) => {
    const findUser = await User.findById(req.params.id);
    const updates = req.body;

    if (!findUser) {
      res.status(404);
      return res.json({ error: "User not found" });
    }

    // hash password before update
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  },

  deleteUser: async (req, res) => {
    const findUser = await User.findById(req.params.id);
    if (!findUser) {
      res.status(404);
      return res.json({ error: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(findUser);
    res.status(200).json(deletedUser);
  },

  sendResetPasswordMail: async (req, res) => {
    const host = req.headers.host;
    crypto.randomBytes(20, (err, buff) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Error generating tiken" });
      }
      const token = buff.toString("hex");

      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          return res.status(500).send({ message: "Error in finding user" });
        }
        if (!user) {
          return res.status(400).send({ message: "User not found" });
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // expire in 1 hr

        user.save(async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "Error saving user" });
          }

          await sendResetMail(user, token, host);
        });
      });
    });
  },

  resetPassword: async (req, res) => {
    const password = req.body;
    const token = req.params;

    try {
      const decodedToken = await jwt.verify(token, process.env.MY_SECRETE_KEY);
      console.log(decodedToken, "dddddddddddddddd");
      const user = await User.findOne({ email: decodedToken.email });
      console.log(user, "uuuuuuuuuuuu");

      if (
        !user ||
        user.resetPasswordToken !== token ||
        user.resetPasswordExpires < Date.now()
      ) {
        return res.status(400).json({ message: "Invalid or Expired Token" });
      }

      const hashedPassword = await bcrypt(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      // await user.save()

      return res.status(200).json({ message: "Password Successfully Reset" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },
};

module.exports = userController;
