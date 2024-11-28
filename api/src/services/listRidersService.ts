import { query } from '../db';


export const listRiders = async (customer_id: string, driver_id: number) => {
    let sql = `SELECT * FROM rides WHERE CUSTOMER_ID = ?`;
    const params: (string | number)[] = [customer_id];

    if (driver_id !== 0) {
        sql += ` AND driver_id = ?`;
        params.push(driver_id);
    }

    const rows = await query(sql, params);

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

    return {
        customer_id,
        rides: formattedRides,
    };
};