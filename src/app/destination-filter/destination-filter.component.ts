import { Component } from '@angular/core';
import { TravelService } from '../travel.service'; 

@Component({
  selector: 'app-destination-filter',
  templateUrl: './destination-filter.component.html',
  styleUrls: ['./destination-filter.component.css']
})
export class DestinationFilterComponent {
  selectedLocations : string[] = []
  ts

  constructor(private service : TravelService) {
    this.ts = service
  }

  change(loc : string) {
    let tmp = this.selectedLocations.indexOf(loc)
    if(tmp == -1) {
      this.selectedLocations.push(loc)    
      this.selectedLocations.sort()
    }
    else this.selectedLocations.splice(tmp, 1)
    this.ts.selectedLocations = this.selectedLocations
  }
}
