export interface Driver {
    id: number,
    name: string
}

export interface RideEstimateBody{
    customer_id: string,
    origin: string,
    destination: string
}

export interface RideConfirmBody {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: Driver;
    value: number;
}