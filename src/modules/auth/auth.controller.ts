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


export const authController = {
    signup
}