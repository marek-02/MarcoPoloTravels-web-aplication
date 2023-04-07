import { Injectable } from '@angular/core';
import * as travelsData from '../assets/travels.json'
import { Travel } from './travel';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  JSONdata = travelsData
  travels : Travel[] 
  locations : string[]
  selectedLocations : string[] = []
  selectedStars : number[] = []
  selectedPrice : number
  minDate : Date
  maxDate : Date

  constructor() { 
    this.travels = this.JSONdata.travels 
    this.setLocations()
    this.selectedPrice = this.maxPrice
    this.minDate = new Date()
    this.maxDate = this.setMaxDate()
  }

  get maxPrice() {
    let m = this.travels[0].price
    for(let travel of this.travels) if(travel.price > m) m = travel.price
    return m
  }

  get minPrice() {
    let tmp = this.travels[0].price
    for(let travel of this.travels) if(travel.price < tmp) tmp = travel.price
    return tmp
  }

  addTravel(t : Travel) {
    this.travels.push(t)
    this.setLocations()
  }

  setMaxDate() {
    let tmp = new Date(this.travels[0].endDate)
    for(let travel of this.travels) {
      let cur = new Date(travel.endDate)
      if(cur > tmp) tmp = cur
    }
    return tmp
  }

  deleteTravel(travel : Travel) {
    let tmp = this.travels.indexOf(travel)
    if(tmp != -1) this.travels.splice(tmp, 1)  
    this.travels = this.travels
    this.setLocations()
  }

  setLocations() {
    let tmp = this.travels.map(x => x.destination)
    this.locations = tmp.reduce((acc: string[], cur: string) => {
      if(!acc.includes(cur)) acc.push(cur)
      return acc
    }, []).sort()
  }
}
