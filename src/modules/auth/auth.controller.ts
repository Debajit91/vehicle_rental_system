import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signup = async(req: Request, res: Response) =>{
    
    try {
       const result = await authServices.signup(req.body);
       
       const user = result.rows[0];
       const {password, ...safeUser} = user;

       res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: safeUser
       }) 
    } catch (err:any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const loginUser = async(req: Request, res: Response)=>{
    const {email, password} = req.body

    try {
        const result = await authServices.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result,
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const authController = {
    signup,
    loginUser
}