import { Request, Response } from "express";
import { estimateRide } from "../services/rideService";
import { RideConfirmBody, RideEstimateBody } from "../interfaces/confirmRideInterface";
import { confirmRide } from "../services/confirmRideService";
import { getDriverById } from "../services/driversService";
import { listRiders } from "../services/listRidersService";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const rideEstimateController = async (req: Request, res: Response): Promise<void> => {
    const { customer_id, origin, destination }: RideEstimateBody = req.body;

    if (!origin || !destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "O endereço de origem e destino são obrigatórios.",
        });
        return;
    } else if (origin === destination) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os endereços de origem e destino não podem ser o mesmo endereço.",
        });
        return;
    } else if (!customer_id) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "O ID do usuário não pode estar em branco",
        });
        return;
    }

    try {
        const result = await estimateRide(origin, destination);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: error.message,
        });
    }
};

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const rideConfirmController = async (req: Request, res: Response): Promise<void> => {
    const { customer_id, origin, destination, distance, duration, driver, value }: RideConfirmBody = req.body

    if (!customer_id || !origin || !destination || !distance || !duration || !driver || !value) {
        res.status(400).json({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        });
        return;
    }

    const validDrivers = await getDriverById(driver.id);

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
        const result = await confirmRide(customer_id, origin, destination, distance, duration, driver.id, driver.name, value);
        res.status(200).json({
            "success": true
        });
    } catch (error: any) {
        res.status(400).json({
            "error_code": "INVALID_DATA",
            "error_description": error.message
        })
    }
}

export const ridersListController = async (req: Request, res: Response): Promise<void> => {
    const { customer_id } = req.params; 
    const driver_id = req.query.driver_id ? Number(req.query.driver_id) : 0;


    try {
        const result = await listRiders(customer_id, driver_id);

        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: 'Erro ao listar motoristas.',
            error: error.message,
        });
    }
};