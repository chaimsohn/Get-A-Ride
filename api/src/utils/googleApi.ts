import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

/**
 * Geocodifica um endereço e retorna a latitude e longitude.
 * @param address - O endereço a ser geocodificado.
 * @returns Um objeto contendo latitude e longitude.
 */
export const geocodeAddress = async (address: string) => {

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    const response = await axios.post(url);
    if (response.data.status !== "OK") {
        console.log(response);
        console.error(response)
        throw new Error(response.data);
    }
    const location = response.data.results[0].geometry.location;
    return {
        latitude: location.lat,
        longitude: location.lng,
    };
};

/**
 * Calcula a rota entre dois pontos.
 * @param origin - O ponto de origem (latitude e longitude).
 * @param destination - O ponto de destino (latitude e longitude).
 * @returns Um objeto contendo informações da rota.
 */
export const calculateRoute = async (origin: any, destination: any) => {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`;
    const response = await axios.post(
        url,
        {
            origin: { location: { latLng: origin } },
            destination: { location: { latLng: destination } },
            travelMode: "DRIVE",
        },
        {
            headers: {
                "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline"
            },
        }
    );

    return response.data.routes[0];
};





