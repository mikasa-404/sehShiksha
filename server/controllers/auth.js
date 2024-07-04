import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, department } =
      req.body;
    //create new user
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //hash password
      if (!password)
        return res.status(400).json({ message: "Password required" });
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hash,
        picturePath,
        department,
      });
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //compare pw with its hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    //If passwords match create JWT payload and sign jwt using it
    const payload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
