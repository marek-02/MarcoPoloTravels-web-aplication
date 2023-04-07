import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Travel } from '../travel';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent {
  @Input() travel : Travel
  reservedSeats = 0
  warning = "Zarezerwuj już dziś!"
  ts
  cs

  constructor(ts : TravelService, cs : CartService) {
    this.ts = ts
    this.cs = cs
  }

  changeRate(r: number) {
    const index = this.ts.travels.indexOf(this.travel)
    this.ts.travels[index].rate = r    
  }

  reserve() : void {
    this.cs.reserve(this.travel)
    if(this.reservedSeats < this.travel.seats) {
      this.reservedSeats++
      if(this.reservedSeats == this.travel.seats) this.warning = "Brak wolnych miejsc."
      else this.warning = "Zarezerwuj już dziś!"
    }
  }

  resign() : void {
    this.cs.resing(this.travel)
    if(this.reservedSeats > 0) {
      this.reservedSeats--
    }
    this.warning = "Zarezerwuj już dziś!"
  }

  delete() : void {
    this.reservedSeats = 0
    this.ts.deleteTravel(this.travel)
  }
}
