import { query } from '../db';


export const getAvailableDrivers = async (distance: number) => {
    const sql = 'SELECT * FROM drivers WHERE km_min <= ?';
    const params = [distance];

    const drivers = await query(sql, params);

    return drivers;
};

export const getDriverById = async (id: number) => {
    const sql = `SELECT * FROM drivers WHERE id = ${id}`;
    const params = [id];

    const drivers = await query(sql, params);

    return drivers;
}

export const getAllDrivers = async () => {
    const sql = 'SELECT * FROM DRIVERS'

    const drivers = await query(sql);

    return drivers;
}
