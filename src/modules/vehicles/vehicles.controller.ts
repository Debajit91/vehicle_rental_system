import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleServices } from "./vehicles.services";

const createVehicle = async(req: Request, res: Response) =>{

    try {
       const result = await vehicleServices.createVehicle(req.body); 

       res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: result.rows[0]
       })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getVehicles = async(req: Request, res: Response)=>{
    try {
        const result = await vehicleServices.getVehicles();

        if(result.rows.length > 0){
            res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        })
        } else{
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: result.rows
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const vehicleController = {
    createVehicle,
    getVehicles
}