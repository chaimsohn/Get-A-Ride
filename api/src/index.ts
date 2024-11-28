import express from "express";
import bodyParser from "body-parser";
import rideRoutes from "./routes/rideRoutes";
import cors from "cors";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const app = express();


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use("/api", rideRoutes);

export default app;

const PORT = 8080;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));