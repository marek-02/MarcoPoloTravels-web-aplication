import { Injectable } from '@angular/core';
import * as travelsData from '../../assets/travels.json'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../models/review';
import { Trip } from '../models/trip';
import { DBService } from './db.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  JSONdata = travelsData
  travels : Trip[] = []
  locations : string[] = []
  selectedLocations : string[] = []
  selectedStars : number[] = []
  selectedPrice : number
  minDate : Date
  maxDate : Date

  constructor(private dbService: DBService) {     
    this.dbService.getTravels().subscribe(res => {
      this.travels = res
      this.setLocations()
      this.selectedPrice = this.maxPrice
      this.minDate = new Date()
      this.maxDate = this.setMaxDate()
    })
  }

  getTravelSeats(travelKey: string) {
    for(let i = 0; i < this.travels.length; i++) if(this.travels[i].id == travelKey) return this.travels[i].availableSeats
    return -1
  }

  get maxPrice() {
    if(this.travels.length == 0) return 0
    let m = this.travels[0].unitPrice
    for(let travel of this.travels) if(travel.unitPrice > m) m = travel.unitPrice
    return m
  }
  
  get minPrice() {
    if(this.travels.length == 0) return 0
    let tmp = this.travels[0].unitPrice
    for(let travel of this.travels) if(travel.unitPrice < tmp) tmp = travel.unitPrice
    return tmp
  }
  
  setMaxDate() {
    let tmp = this.travels[0].endDate
    for(let travel of this.travels) {
      let cur = travel.endDate
      if(cur > tmp) tmp = cur
    }
    return tmp
  }
  
  setLocations() {
    let tmp = this.travels.map(x => x.destination)
    this.locations = tmp.reduce((acc: string[], cur: string) => {
      if(!acc.includes(cur)) acc.push(cur)
      return acc
    }, []).sort()
  }
  
  // addOpinion(t: Travel, o: Opinion) {
  //   t.opinions.push(o)
  //   this.fireService.addOpinion(t)
  // }

  addTravel(t : Trip) {
    // this.travels.push(t)
    this.dbService.addTravel(t)
    this.setLocations()
  }

  deleteTravel(travel : Trip) {
    let tmp = this.travels.indexOf(travel)
    if(tmp != -1) this.dbService.deleteTravel(travel.id)
    //this.travels = this.travels
    this.setLocations()
  }
}
