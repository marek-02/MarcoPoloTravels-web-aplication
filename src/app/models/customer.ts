import { Adress } from "./adress";
export interface Customer {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    adress: Adress
}