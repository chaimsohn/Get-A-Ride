import { query } from '../db';

export const confirmRide = async (cpf: any, origin: string, destination: string, distance: number, duration: string, driverId: number, driverName: string, price: number) => {
    const sql = 'INSERT INTO rides ( customer_id, origin, destination, distance, duration, driver_id, driver_name, value ) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ';
    const params = [cpf, origin, destination, distance, duration, driverId, driverName, price];

    const drivers = await query(sql, params);

    return drivers;
};