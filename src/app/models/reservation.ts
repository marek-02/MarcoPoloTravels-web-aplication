export interface Reservation {
    id?: string,
    purchaseDate?: Date,
    boughtTickets: number,
    state: string,
    customer_id: string,
    trip_id: string
}
