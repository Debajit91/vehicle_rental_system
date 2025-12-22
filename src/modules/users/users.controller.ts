import { Request, Response } from "express";
import { userServices } from "./users.services";

const getUsers = async(req: Request, res: Response) =>{
    try {
        const result = await userServices.getUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userControllers = {
    getUsers
}