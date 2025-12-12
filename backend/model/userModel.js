import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    profilePic: {type:String, default:""},
    profilePicId: {type:String, default:""}, // will use kmm to delete from cloudinary
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role: {type:String, default:"user", enum:["user","admin"]},
    token: {type:String, default:null},
    isVerified: {type:Boolean, default:false},
    isloggedIn: {type:Boolean, default:false},
    otp: {type:String, default:null},
    otpExpiry: {type:Date, default:null},
    address: {type:String},
    city: {type:String},
    zipCode: {type:String},
    phoneNo: {type:String},
}, {timestamps:true});

export const User = mongoose.model("User", userSchema);
