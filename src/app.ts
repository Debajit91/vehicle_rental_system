import express, { Request, Response } from 'express';
import initDB from './config/db';
import { vehicleRoutes } from './modules/vehicles/vehicles.routes';
import { authRoutes } from './modules/auth/auth.routes';



const app = express();

// initializing DB
initDB();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req:Request, res:Response) =>{
    res.send('Hello This is Vehicle Rental System App!')
})

// vehicle Route
app.use('/api/v1/vehicles', vehicleRoutes);

// auth Route
app.use('/api/v1/auth/', authRoutes);

// Not found
app.use((req:Request, res:Response) =>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

export default app;
