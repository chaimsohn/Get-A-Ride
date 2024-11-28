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
exports.ridersListController = exports.rideConfirmController = exports.rideEstimateController = void 0;
const rideService_1 = require("../services/rideService");
const confirmRideService_1 = require("../services/confirmRideService");
const driversService_1 = require("../services/driversService");
const listRidersService_1 = require("../services/listRidersService");
/**
 *
 * @param req
 * @param res
 * @returns
 */
const rideEstimateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination } = req.body;
    if (!origin || !destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "O endereço de origem e destino são obrigatórios.",
        });
        return;
    }
    else if (origin === destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os endereços de origem e destino não podem ser o mesmo endereço.",
        });
        return;
    }
    else if (!customer_id) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "O ID do usuário não pode estar em branco",
        });
        return;
    }
    try {
        const result = yield (0, rideService_1.estimateRide)(origin, destination);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: error.message,
        });
    }
});
exports.rideEstimateController = rideEstimateController;
/**
 *
 * @param req
 * @param res
 * @returns
 */
const rideConfirmController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;
    if (!customer_id || !origin || !destination || !distance || !duration || !driver || !value) {
        res.status(400).json({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        });
        return;
    }
    // Validação: Verificar se o motorista existe (exemplo básico, pode ser integrado a um banco de dados)
    const validDrivers = yield (0, driversService_1.getDriverById)(driver.id);
    // const driverFound = validDrivers.find((d) => d.id === driver.id && d.name === driver.name);
    const driverFound = validDrivers;
    if (!driverFound) {
        res.status(404).json({
            "error_code": "DRIVER_NOT_FOUND",
            "error_description": "Motorista não encontrado",
        });
        return;
    }
    if (distance <= validDrivers[0].km_min * 1000 || distance <= 0) {
        res.status(406).json({
            "error_code": "INVALID_DISTANCE",
            "error_description": "Quilometragem inválida para o motorista",
        });
        return;
    }
    try {
        console.log(customer_id, origin, destination, distance, duration, driver, value);
        // const result = { "success": true }
        const result = yield (0, confirmRideService_1.confirmRide)(customer_id, origin, destination, distance, duration, driver.id, driver.name, value);
        res.status(200).json({
            "success": true
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            "error_code": "INVALID_DATA",
            "error_description": error.message
        });
    }
});
exports.rideConfirmController = rideConfirmController;
const ridersListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id } = req.params; // Acessa o parâmetro da URL
    const driver_id = req.query.driver_id ? Number(req.query.driver_id) : 0;
    console.log(`Customer ID: ${customer_id}, Driver ID: ${driver_id}`);
    try {
        // Chama o serviço para listar motoristas
        const result = yield (0, listRidersService_1.listRiders)(customer_id, driver_id);
        // Retorna a resposta com os dados dos motoristas
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Erro ao listar motoristas.',
            error: error.message,
        });
    }
});
exports.ridersListController = ridersListController;
