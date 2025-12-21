import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";


export const isAuthenticated = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            });
        }

        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({
                    success:false,
                    message:"Token has expired"
                });
            }
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            });
        }

        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        req.user = user;
        req.id = user._id;
        next(); 


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Authentication middleware error "+ error.message
        });
    }
}

export const isAdmin = async(req,res,next)=>{
    try {
        if(req.user && req.user.role === 'admin'){
            next();
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin middleware error "+ error.message
        });
    }
}