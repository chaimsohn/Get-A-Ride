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
exports.estimateRide = void 0;
const googleApi_1 = require("../utils/googleApi");
const driversService_1 = require("./driversService");
/**
 *
 * @param addressA
 * @param addressB
 * @returns
 */
const estimateRide = (addressA, addressB) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const origin = yield (0, googleApi_1.geocodeAddress)(addressA);
        const destination = yield (0, googleApi_1.geocodeAddress)(addressB);
        const routeResponse = yield (0, googleApi_1.calculateRoute)(origin, destination);
        const distance = routeResponse.distanceMeters;
        const duration = routeResponse.duration;
        // FAZER UM SELECT * FROM DRIVER WHERE DRIVER_MINUMUN_DISTANCE <= distance
        // OPTION = SELECT * FROM DRIVER WHERE DRIVER_MINUMUN_DISTANCE <= distance
        const drivers = yield (0, driversService_1.getAvailableDrivers)(distance / 1000);
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
    }
    catch (error) {
        console.log(error);
        console.error(error);
        throw new Error(error.message);
    }
});
exports.estimateRide = estimateRide;
