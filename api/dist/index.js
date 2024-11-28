"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const rideRoutes_1 = __importDefault(require("./routes/rideRoutes"));
const cors_1 = __importDefault(require("cors"));
// import dotenv from 'dotenv';
// dotenv.config();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*', // Substitua pelo URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
app.use(body_parser_1.default.json());
app.use("/api", rideRoutes_1.default);
exports.default = app;
const PORT = 8080;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
