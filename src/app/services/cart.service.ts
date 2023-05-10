import { Injectable } from '@angular/core';
import { DBService } from './db.service';
// import { Purchase } from '../models/u_purchase';
import { Reservation } from '../models/reservation';
import { Trip } from '../models/trip';
import { TravelService } from './travel.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  reservations : Reservation[] = []
  purchases : Reservation[] = []
  
  fullPrice: 0
  fullReservations = 0

  constructor(private dbService: DBService, private ts: TravelService) { 
    this.dbService.getReservations().subscribe(res => {
      res = res.filter(x => x.state == "New")
      this.reservations = res
      this.fullReservations = this.reservations.map(r => r.boughtTickets).reduce((a, b) => a + b, 0)
      // this.fullPrice = 0
      // this.reservations.forEach(a => {
      //   this.fullPrice = this.dbService.getTravelByKey(a.trip_id).subscribe(res => res.unitPrice * a.boughtTickets)  
      // })
    })
    this.dbService.getReservations().subscribe(res => {
      res = res.filter(x => x.state == "Purchased")
      this.purchases = res
    })
  }

  findReservation(t_id: string, reservations : Reservation[]) {
    for(let i = 0; i < reservations.length; i++) {
      if(reservations[i].trip_id == t_id) {
        return i
      }
    }
    return -1
  }

  hasAnyReservation(travelKey: string) {
    for(let i = 0; i < this.reservations.length; i++) if(this.reservations[i].trip_id == travelKey) return true
    return false
  }

  travelToReservation(t: Trip) {    
    return {
      id: undefined,
      purchaseDate: undefined,
      boughtTickets: 1,
      state: "New",
      customer_id: "6447a9ead297195ac0dd2413",
      trip_id: t.id
    } as Reservation
  }

  reserve(t: Trip) {        
    const r : Reservation = this.travelToReservation(t)
    let index = this.findReservation(t.id, this.reservations)
    

    if(index == -1) this.dbService.newReservation(r)
    else this.dbService.updateReservation(this.reservations[index].id || '', this.reservations[index].boughtTickets + 1)
    this.dbService.changeSeats(r.trip_id, this.ts.getTravelSeats(r.trip_id) - 1)
  }

  resing(t : Trip) { 
    const r : Reservation = this.travelToReservation(t)
    this.dbService.changeSeats(r.trip_id, this.ts.getTravelSeats(r.trip_id) + 1)
    let index = this.findReservation(r.trip_id, this.reservations)

    if(index != -1) {
      if(this.reservations[index].boughtTickets - 1 == 0) this.dbService.deleteReservation(this.reservations[index].id || '')
      else this.dbService.updateReservation(this.reservations[index].id || '', this.reservations[index].boughtTickets - 1)
    }
  }


  reservationToPurchase(r: Reservation) {
    return {
      ...r,
      state: "Purchased"
    } as Reservation
  }

  buy(r: Reservation) {
    const p : Reservation = this.reservationToPurchase(r)
    let index = this.findReservation(r.trip_id, this.purchases)
    
    if(index == -1) this.dbService.newReservation(p) 
    else this.dbService.updateReservation(this.purchases[index].id || '', p.boughtTickets + this.purchases[index].boughtTickets)
    // console.log(index, p.seats, this.purchases[index].seats);
    
    this.dbService.deleteReservation(r.id || '')
  }
}
