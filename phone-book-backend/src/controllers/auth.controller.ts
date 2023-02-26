import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { generatePasswordReset } from "../helper/generate-password";
import nodemailer from "nodemailer";
import Logging from "../library/Logging";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, config.jwt.secret);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  try {
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
      expiresIn: "30d",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { resetPasswordToken, resetPasswordExpires } =
      generatePasswordReset(user);

    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        passwordResetToken: resetPasswordToken,
        passwordResetExpires: resetPasswordExpires,
      }
    );

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "recoveryrecover01@gmail.com",
        pass: "whjmdoxubnilquaw",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "recoveryrecover01@gmail.com",
      subject: "Password reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/api/auth/reset/${resetPasswordToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email: ", err);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    Logging.error(error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() },
    });

    console.log(user?.passwordResetToken);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Update user's password
    user.password = hashedPassword;
    user.passwordResetToken = undefined || "";
    user.passwordResetExpires = undefined as any;

    await user.save();

    // Send notification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "recoveryrecover01@gmail.com",
        pass: "whjmdoxubnilquaw",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "recoveryrecover01@gmail.com",
      subject: "Password Reset Confirmation",
      text: "Your password has been reset successfully.",
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email: ", err);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Password reset successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
