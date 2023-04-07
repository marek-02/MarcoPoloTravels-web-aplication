import { Component } from '@angular/core';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent {
  max : number
  min : number
  price : number
  ts

  constructor(private service : TravelService) {
    this.ts = service
    this.price = this.ts.maxPrice
  }

  change(e:any) {
    this.price = e.target.value
    this.ts.selectedPrice = this.price
  }
}
