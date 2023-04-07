import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Purchase } from '../purchase';
import { Travel } from '../travel';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  cs

  constructor(private service: CartService) {
    this.cs = service
  }

  checkStatus(p: Purchase) {
    const startdate = new Date(p.startDate)
    const enddate = new Date(p.endDate)
    const today = new Date()
    if(startdate > today) return "przyszła"
    else if (enddate > today) return "aktywna"
    else return "archiwalna"
  }
}
