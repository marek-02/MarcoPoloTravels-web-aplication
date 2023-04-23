import { Injectable } from '@angular/core';
import { FireStoreService } from './fire-store-service.service';
import { Purchase } from '../models/purchase';
import { Reservation } from '../models/reservation';
import { Travel } from '../models/travel';
import { TravelService } from './travel.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  reservations : Reservation[] = []
  purchases : Purchase[] = []
  
  fullPrice = 0
  fullReservations = 0

  constructor(private fireService: FireStoreService, private ts: TravelService) { 
    this.fireService.getReservations().subscribe(res => {
      this.reservations = res.map(e => {
        return {
          ...e.payload.doc.data() as {},
          key: e.payload.doc.id,
        } as Reservation
      })
      this.fullReservations = this.reservations.map(r => r.seats).reduce((a, b) => a + b, 0)
      this.fullPrice = 0
      this.reservations.forEach(a => this.fullPrice += a.seats * a.price)
    })
    this.fireService.getPurchases().subscribe(res => {
      this.purchases = res.map(e => {
        return {
          ...e.payload.doc.data() as {},
          key: e.payload.doc.id
        } as Purchase
      })
    })
  }

  findReservation(r: Reservation) {
    for(let i = 0; i < this.reservations.length; i++) {
      if(this.reservations[i].travelKey == r.travelKey) {
        r.key = this.reservations[i].key
        return i      
      }
    }
    return -1
  }

  hasAnyReservation(travelKey: string) {
    for(let i = 0; i < this.reservations.length; i++) if(this.reservations[i].travelKey == travelKey) return true
    return false
  }

  travelToReservation(t: Travel) {    
    return {
      travelKey: t.key,
      key: "",
      name: t.name,
      destination: t.destination,
      startDate: t.startDate,
      endDate: t.endDate,
      price: t.price,
      seats: 1
    } as Reservation
  }

  reserve(t: Travel) {        
    const r : Reservation = this.travelToReservation(t)
    let index = this.findReservation(r)
    
    if(index == -1) this.fireService.newReservation(r)
    else this.fireService.updateReservation(r.key, this.reservations[index].seats + 1)
    this.fireService.changeSeats(r.travelKey, this.ts.getTravelSeats(r.travelKey) - 1)
  }

  resing(t : Travel) { 
    const r : Reservation = this.travelToReservation(t)
    this.fireService.changeSeats(r.travelKey, this.ts.getTravelSeats(r.travelKey) + 1)
    let index = this.findReservation(r)

    if(index != -1) {
      if(this.reservations[index].seats - 1 == 0) this.fireService.deleteReservation(r.key)
      else this.fireService.updateReservation(r.key, this.reservations[index].seats - 1)
    }
  }

  findPurchase(p: Purchase) {
    for(let i = 0; i < this.purchases.length; i++) {
      if(this.purchases[i].travelKey == p.travelKey) {
        p.key = this.purchases[i].key
        return i      
      }
    }
    return -1
  }

  reservationToPurchase(r: Reservation) {
    return {
      travelKey: r.travelKey,
      key: "",
      name: r.name,
      destination: r.destination,
      startDate: r.startDate,
      endDate: r.endDate,
      dateOfPurchase: new Date().toString(),
      price: r.price,
      seats: r.seats
    } as Purchase
  }

  buy(r: Reservation) {
    const p : Purchase = this.reservationToPurchase(r)
    let index = this.findPurchase(p)
    
    if(index == -1) this.fireService.newPurchase(p) 
    else this.fireService.updatePurchase(p.key, p.seats + this.purchases[index].seats)
    console.log(index, p.seats, this.purchases[index].seats);
    
    this.fireService.deleteReservation(r.key)
  }
}
