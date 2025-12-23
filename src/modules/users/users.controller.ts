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

const updateUser = async(req: Request, res: Response)=>{
    
    try {
        const {name, email, phone, role} = req.body;
        const result = await userServices.updateUser(name, email, phone, role, req.params.userId as string);
        
        const updatedUser = result.rows[0];
        const {password, ...safeUser} = updatedUser;

        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else{
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: safeUser
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async(req: Request, res: Response)=>{
    try {
        const result = await userServices.deleteUser(req.params.userId as string)

        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else{
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userControllers = {
    getUsers,
    updateUser,
    deleteUser
}