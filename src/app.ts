import express, { Request, Response } from 'express';
import initDB from './config/db';



const app = express()

// initializing DB
initDB();

app.use(express.json());

app.get('/', (req:Request, res:Response) =>{
    res.send('Hello This is Vehicle Rental System App!')
})

app.use((req:Request, res:Response) =>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

export default app;
