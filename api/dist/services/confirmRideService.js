"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmRide = void 0;
const db_1 = require("../db");
const confirmRide = (cpf, origin, destination, distance, duration, driverId, driverName, price) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO rides ( customer_id, origin, destination, distance, duration, driver_id, driver_name, value ) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ';
    const params = [cpf, origin, destination, distance, duration, driverId, driverName, price];
    // A consulta agora retorna um array de `Driver`
    const drivers = yield (0, db_1.query)(sql, params);
    return drivers;
});
exports.confirmRide = confirmRide;
