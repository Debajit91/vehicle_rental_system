import { pool } from "../../config/db"

const createVehicle = async(payload: Record<string, unknown>) =>{
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} =payload;

    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

    return result;
};

const getVehicles = async()=>{
    const result = await pool.query(`SELECT * FROM vehicles`);

    return result;
}

const getSingleVehicle = async(vehicleId:string)=>{
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicleId]);

    return result;
}

const updateVehicle = async(vehicle_name:string, daily_rent_price:number, vehicleId:string)=>{

    const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1, daily_rent_price=$2 WHERE id=$3 RETURNING *`, [vehicle_name, daily_rent_price, vehicleId]);

    return result;
}

export const vehicleServices = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle
}