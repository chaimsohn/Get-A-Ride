import { api } from "../providers/AxiosProvider";


/**
 * 
 * @param cpf 
 * @param origin 
 * @param destination 
 * @returns 
 */
const estimate = async (cpf: any, origin: string, destination: string) => {

  try {
    const response = await api.post(`estimate`, {
      customer_id: cpf,
      origin: origin,
      destination: destination
    });
    return response;
  } catch (error: any) {
    throw new Error(`Erro ao buscar corrida: ${error}`);
  }
};

/**
 * 
 * @param cpf 
 * @param origin 
 * @param destination 
 * @param distance 
 * @param duration 
 * @param driverId 
 * @param driverName 
 * @param price 
 * @returns 
 */
const confirm = async (cpf: any, origin: string, destination: string, distance: number, duration: string, driverId: number, driverName: string, price: number) => {

  try {
    const response = await api.patch(`confirm`, {
      customer_id: cpf,
      origin: origin,
      destination: destination,
      distance: distance,
      duration: duration,
      driver: {
        id: driverId,
        name: driverName
      },
      value: price
    });
    return response;
  } catch (error: any) {
    throw new Error(`Erro ao buscar corrida: ${error}`);
  }
};

/**
 * 
 * @param cpf 
 * @param driverId 
 * @returns 
 */
const listRides = async (cpf: string, driverId: number) => {

  const data = {
    customer_id: cpf,
    driver_id: driverId,
  }
  try {
    const response = await api.get(`${cpf}?driver_id=${driverId}`)
    return response;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Erro ao buscar corrida: ${error.message}`);
  }
};


export const CommunicationService = {
  //   getAllBases,
  estimate,
  confirm,
  listRides
};