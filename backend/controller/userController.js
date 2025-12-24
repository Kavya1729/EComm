import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import e from "express";
import { Session } from "../model/sessionModel.js";
import { sendOtpEmail } from "../emailVerify/sendOtpEmail.js";
import { useReducer } from "react";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Register controller " + error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email verification error " + error.message,
    });
  }
};

export const reverify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Verification email sent again successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reverify controller " + error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (existingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Email not verified. Please verify your email to login",
      });
    }

    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    existingUser.isloggedIn = true;
    await existingUser.save();

    const existingSession = await Session.findOne({ userId: existingUser._id });

    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id });
    }

    await Session.create({ userId: existingUser._id });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
    const userId = req.id;
    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isloggedIn: false });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout controller " + error.message,
    });
  }
};

export const forgotPassword = async(req,res)=>{
    try {
        const{email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random()*900000).toString();
        const otpExpiry = Date.now()+ 1000*60*10;   // 10 minutes
        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();

        await sendOtpEmail(otp,email);
        return res.status(200).json({
            success:true,
            message:"OTP sent to email"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Forgot password controller " + error.message
        });
    }
}

export const verifyOTP = async(req,res)=>{
  try {
    const {otp} = req.body;
    const email = req.params.email;

    if(!otp){
      return res.status(400).json({
        success:false,
        message:"OTP is required"
      });
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      });
    }

    if(!user.otp || !user.otpExpiry){
      return res.status(400).json({
        success:false,
        message:"No OTP found. Please request a new one"
      });
    }

    if(user.otp< Date.now()){
      return res.status(400).json({
        success:false,
        message:"OTP has expired. Please request a new one"
      });
    }

    if(user.otp!== otp){
      return res.status(400).json({
        success:false,
        message:"Invalid OTP"
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success:true,
      message:"OTP verified successfully"
    });


  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Verify OTP controller " + error.message
    });
  }
}

export const changePassword = async(req,res)=>{
  try {
    const {newPassword,confirmPassword} = req.body;
    const email = req.params.email;
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      });
    }
    if(newPassword !== confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Passwords do not match"
      });
    }

    if(!newPassword || !confirmPassword){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success:true,
      message:"Password changed successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Change password controller " + error.message
    });
  }
}

export const allUser = async(req,res)=>{
  try {
    const users = await User.find();
    return res.status(200).json({
      success:true,
      users
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"All user controller " + error.message
    });
  }
}

export const getUserById = async(req,res)=>{
  try {
    const {userId} = req.params;
    const user = await User.findById(userId).select("-password -otp -otpExpiry -token");
    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      });
    }
    res.status(200).json({
      success:true,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Get user by ID controller " + error.message
    });
  }
}