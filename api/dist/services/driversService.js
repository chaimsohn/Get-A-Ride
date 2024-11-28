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
exports.getAllDrivers = exports.getDriverById = exports.getAvailableDrivers = void 0;
// service.ts
const db_1 = require("../db");
const getAvailableDrivers = (distance) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM drivers WHERE km_min <= ?';
    const params = [distance];
    // A consulta agora retorna um array de `Driver`
    const drivers = yield (0, db_1.query)(sql, params);
    return drivers;
});
exports.getAvailableDrivers = getAvailableDrivers;
const getDriverById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM drivers WHERE id = ${id}`;
    const params = [id];
    const drivers = yield (0, db_1.query)(sql, params);
    return drivers;
});
exports.getDriverById = getDriverById;
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM DRIVERS';
    const drivers = yield (0, db_1.query)(sql);
    return drivers;
});
exports.getAllDrivers = getAllDrivers;
