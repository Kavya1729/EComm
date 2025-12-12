import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { text } from 'express';
dotenv.config();

export const verifyEmail = (token,email)=>{
    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    const mailConfiguration = {
        from:process.env.MAIL_USER,
        to:email,
        subject:"Email Verification for Your Account",
        text:`Please click on the link to verify your email:
        http://localhost:5173/verify/${token} Thanks!
        `,
    }

    transporter.sendMail(mailConfiguration, function(err,info){
        if(err){
            console.log("Error occurred while sending email ", err.message);
        }else{
            console.log("Email sent successfully ", info.response);
        }
    })
}