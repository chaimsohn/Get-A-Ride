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
exports.listRiders = void 0;
const db_1 = require("../db");
const listRiders = (customer_id, driver_id) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT * FROM rides WHERE CUSTOMER_ID = ?`; // Consulta base para o cliente
    const params = [customer_id];
    // Adiciona condição para filtrar pelo motorista se driver_id for diferente de 0
    if (driver_id !== 0) {
        sql += ` AND driver_id = ?`;
        params.push(driver_id);
    }
    // Consulta ao banco de dados
    const rows = yield (0, db_1.query)(sql, params);
    // Mapeia os resultados no formato esperado
    const formattedRides = rows.map((ride) => ({
        id: ride.id,
        date: ride.created_at,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
            id: ride.driver_id,
            name: ride.driver_name,
        },
        value: ride.value,
    }));
    // Retorna o objeto no formato esperado
    return {
        customer_id,
        rides: formattedRides,
    };
});
exports.listRiders = listRiders;
