import { Review } from "./review";

export interface Trip {
    id: string,
    description: string,
    destination: string, 
    startDate: Date,
    endDate: Date,
    availableSeats: number,
    title: string, 
    unitPrice: number,
    images : Review[]
}
