import { Injectable } from '@angular/core';
import * as travelsData from '../../assets/travels.json'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Opinion } from '../models/opinion';
import { Travel } from '../models/travel';
import { FireStoreService } from './fire-store-service.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  JSONdata = travelsData
  travels : Travel[] = []
  locations : string[] = []
  selectedLocations : string[] = []
  selectedStars : number[] = []
  selectedPrice : number
  minDate : Date
  maxDate : Date

  constructor(private fireService: FireStoreService) {     
    this.fireService.getTravels().subscribe(res => {
      this.travels = res.map(e => {
        return {
          ...e.payload.doc.data() as {},
          key: e.payload.doc.id
        } as Travel
      })
      this.setLocations()
      this.selectedPrice = this.maxPrice
      this.minDate = new Date()
      this.maxDate = this.setMaxDate()
    })
  }

  getTravelSeats(travelKey: string) {
    for(let i = 0; i < this.travels.length; i++) if(this.travels[i].key == travelKey) return this.travels[i].seats
    return -1
  }

  get maxPrice() {
    if(this.travels.length == 0) return 0
    let m = this.travels[0].price
    for(let travel of this.travels) if(travel.price > m) m = travel.price
    return m
  }
  
  get minPrice() {
    if(this.travels.length == 0) return 0
    let tmp = this.travels[0].price
    for(let travel of this.travels) if(travel.price < tmp) tmp = travel.price
    return tmp
  }
  
  setMaxDate() {
    let tmp = new Date(this.travels[0].endDate)
    for(let travel of this.travels) {
      let cur = new Date(travel.endDate)
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
  
  addOpinion(t: Travel, o: Opinion) {
    t.opinions.push(o)
    this.fireService.addOpinion(t)
  }

  addTravel(t : Travel) {
    // this.travels.push(t)
    this.fireService.addTravel(t)
    this.setLocations()
  }

  deleteTravel(travel : Travel) {
    let tmp = this.travels.indexOf(travel)
    if(tmp != -1) this.fireService.deleteTravel(travel.key)
    //this.travels = this.travels
    this.setLocations()
  }
}
