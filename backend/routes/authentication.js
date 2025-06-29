import express from "express";
import  User  from "../models/userAuth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthRouter = express.Router();

AuthRouter.post("/registration", async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const { firstName, email,password } = req.body;

    const user = new User({
      firstName,
      email,
      password: passwordHash,

    });

    await user.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET || "RENTLINK2110"
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // Adjust based on frontend/backend setup
      secure: false, // Set to true if using HTTPS
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

AuthRouter.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default AuthRouter;
