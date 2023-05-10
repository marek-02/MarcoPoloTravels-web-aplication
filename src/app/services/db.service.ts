import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Purchase } from '../models/u_purchase';
import { Reservation } from '../models/reservation';
import { Trip } from '../models/trip';

const tripsUrl = 'http://localhost:8080/trips';
const reviewsUrl = 'http://localhost:8080/reviews';
const customersUrl = 'http://localhost:8080/customers';
const reservationsUrl = 'http://localhost:8080/reservations';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) { }

  getTravels(): Observable<Trip[]> {
    return this.http.get<Trip[]>(tripsUrl)
  }

  getTravelByKey(key: string): Observable<Trip> {
    return this.http.get<Trip>(`${tripsUrl}/${key}`)
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(reservationsUrl)
  }

  // getPurchases() {
  //   return this.db.collection("Zakupy").snapshotChanges()
  // }

  newReservation(r: Reservation): Observable<Reservation> {        
    return this.http.post<Reservation>(reservationsUrl, r)
  }

  updateReservation(key: string, numberOfSeats: number): Observable<Reservation> {    
    return this.http.put<Reservation>(`${reservationsUrl}/${key}`, {boughtTickets: numberOfSeats})
  }

  changeSeats(travelKey: string, seats: number): Observable<Trip> {
    return this.http.put<Trip>(`${tripsUrl}/${travelKey}`, {availableSeats: seats})
  }

  deleteReservation(key: string): Observable<Reservation> {
    return this.http.delete<Reservation>(`${reservationsUrl}/${key}`)
  }

  // newPurchase(r: Purchase) {    
  //   this.db.collection("Zakupy").add({
  //     name: r.name,
  //     destination: r.destination,
  //     startDate: r.startDate,
  //     endDate: r.endDate,
  //     dateOfPurchase: r.dateOfPurchase,
  //     price: r.price,
  //     seats: r.seats,
  //     travelKey: r.travelKey
  //   })
  // }

  // updatePurchase(key: string, numberOfSeats: number) {
  //   this.db.collection("Zakupy").doc(key).update({seats: numberOfSeats})
  // }
  
  // addOpinion(t: Trip): Observable<Trip> {
  //   return this.http.post<Trip>(tripsUrl, t)
  // }

  // updateRate(t: Travel, r: number) {    
  //   this.db.collection("Wycieczki").doc(t.key).update({rate: r})
  // }

  addTravel(t: Trip): Observable<Trip> {
    return this.http.post<Trip>(tripsUrl, t)
  }

  deleteTravel(key: string): Observable<Trip> {
    return this.http.delete<Trip>(`${tripsUrl}/${key}`)
  }
}
