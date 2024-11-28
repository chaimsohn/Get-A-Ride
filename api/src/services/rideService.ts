import { geocodeAddress, calculateRoute } from "../utils/googleApi";
import { getAvailableDrivers } from "./driversService";

/**
 * 
 * @param addressA 
 * @param addressB 
 * @returns 
 */
export const estimateRide = async (addressA: string, addressB: string) => {
    try {
        const origin = await geocodeAddress(addressA);
        const destination = await geocodeAddress(addressB);

        const routeResponse = await calculateRoute(origin, destination);

        const distance = routeResponse.distanceMeters;
        const duration = routeResponse.duration;

        const drivers = await getAvailableDrivers(distance/1000)
        const options = drivers.map(driver => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: {
                rating: `${driver.rating}/5`,
                comment: driver.comment,
            },
            value: distance * (driver.price / 1000),
        }));

        return {
            origin,
            destination,
            distance,
            duration,
            options,
            routeResponse,
        };
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};
