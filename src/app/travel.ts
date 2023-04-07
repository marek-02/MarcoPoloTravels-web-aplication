import { Opinion } from "./opinion";

export interface Travel {
    key: string,
    name: string; 
    destination: string; 
    startDate: string; 
    endDate: string; 
    price: number; 
    seats: number; 
    description: string; 
    imgLink: string;   
    allImages : string[];
    opinions: Opinion[];
    rate: number;
}
