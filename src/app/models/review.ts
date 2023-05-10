export interface Review {
    id: string,
    comment: string,
    rating: number,
    reviewedData: Date,
    customer_id: string,
    trip_id: string
}
