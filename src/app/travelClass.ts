import { Travel } from "./travel";

export class TravelClass implements Travel {
    name: string
    destination: string
    startDate: string
    endDate: string
    price: number 
    seats: number
    description: string
    imgLink: string
    rate: number
    
    constructor(
        name: string,
        destination: string,
        startDate: string,
        endDate: string,
        price: number,
        seats: number, 
        description: string,
        imgLink: string,
        rate: number
    ) { 
        this.name = name
        this.destination = destination
        this.startDate = startDate
        this.endDate = endDate
        this.price = price
        this.seats = seats
        this.description = description
        this.imgLink = imgLink
        this.rate = rate
    }
}