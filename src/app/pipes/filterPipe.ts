import { Pipe, PipeTransform } from "@angular/core";
import { min } from "rxjs";
import { Travel } from "../models/travel";

@Pipe({ name: 'filterPipe', pure: false })
export class FilterPipe implements PipeTransform {
    transform(travels: Travel[], filteredLocations: string[], filteredPrice: number, minDate: Date | undefined, maxDate: Date | undefined, filteredStars: number[]): Travel[] {
    if (!travels)
        return []
    if(filteredLocations && filteredLocations.length != 0) {
        travels = travels.filter(travel => {
            return filteredLocations.includes(travel.destination)
        })
    }
    if(filteredPrice != -1) {
        travels = travels.filter(travel => {
            return travel.price <= filteredPrice
        })
    }
    if(!(minDate === undefined) && !isNaN(minDate.getTime())) {
        travels = travels.filter(travel => {
            let startDate = new Date(travel.startDate)                  
            return startDate >= minDate
        })
    }
    if(!(maxDate === undefined) && !isNaN(maxDate.getTime())) {
        travels = travels.filter(travel => {
            let endDate = new Date(travel.endDate)                  
            return endDate <= maxDate
        })
    }
    if(filteredStars && filteredStars.length != 0) {
        travels = travels.filter(travel => {
            return filteredStars.includes(Math.round(travel.rate))
        })
    }
    return travels
 }
}