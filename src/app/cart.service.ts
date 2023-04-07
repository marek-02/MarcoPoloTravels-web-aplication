import { Injectable } from '@angular/core';
import { Travel } from './travel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  reservations : Travel[] = []
  amountOfReservations : number[] = []
  fullPrice = 0
  fullReservations = 0

  constructor() { }

  reserve(t: Travel) {    
    const index = this.reservations.indexOf(t)
    if(index == -1) {
      this.reservations.push(t)
      this.amountOfReservations.push(1)
    }
    else this.amountOfReservations[index]++
    this.fullReservations++
    this.fullPrice += t.price
  }

  resing(t : Travel) { 
    const index = this.reservations.indexOf(t)
    if(index != -1) {
      this.amountOfReservations[index]--
      if(this.amountOfReservations[index] == 0) {
        this.amountOfReservations.splice(index, 1)
        this.reservations.splice(index, 1)
      }  
      this.fullReservations--
      this.fullPrice -= t.price
    }
  }
}
