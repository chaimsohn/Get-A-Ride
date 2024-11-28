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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRoute = exports.geocodeAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
/**
 * Geocodifica um endereço e retorna a latitude e longitude.
 * @param address - O endereço a ser geocodificado.
 * @returns Um objeto contendo latitude e longitude.
 */
const geocodeAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(process.env.GOOGLE_API_KEY)
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    const response = yield axios_1.default.post(url);
    if (response.data.status !== "OK") {
        console.log(response);
        console.error(response);
        throw new Error(response.data);
    }
    const location = response.data.results[0].geometry.location;
    return {
        latitude: location.lat,
        longitude: location.lng,
    };
});
exports.geocodeAddress = geocodeAddress;
/**
 * Calcula a rota entre dois pontos.
 * @param origin - O ponto de origem (latitude e longitude).
 * @param destination - O ponto de destino (latitude e longitude).
 * @returns Um objeto contendo informações da rota.
 */
const calculateRoute = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`;
    const response = yield axios_1.default.post(url, {
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode: "DRIVE",
    }, {
        headers: {
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline"
        },
    });
    console.log(response);
    console.error(response);
    return response.data.routes[0];
});
exports.calculateRoute = calculateRoute;
// export const calculateRoute = async (origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }) => {
//     const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
//     const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`;
//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
//             },
//             body: JSON.stringify({
//                 origin: { location: { latLng: origin } },
//                 destination: { location: { latLng: destination } },
//                 travelMode: "DRIVE",
//             }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(
//                 `Google Routes API Error: ${response.status} - ${errorData.error?.message || response.statusText}`
//             );
//         }
//         const data = await response.json();
//         return data.routes[0];
//     } catch (error) {
//         console.error("Error calculating route:", error);
//         throw error;
//     }
// };
