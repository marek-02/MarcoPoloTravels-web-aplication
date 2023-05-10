import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Opinion } from '../../models/review';
import { Travel } from '../../models/trip';
import { TravelService } from '../../services/travel.service';
import { TravelClass } from '../../models/u_travelClass';
import { FireStoreService } from '../../services/fire-store-service.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css']
})
export class TravelDetailsComponent {
  isLoading = true
  imgIndex = 0
  warning = "Zarezerwuj już dziś!"
  hideForm = true
  travel: Travel = new TravelClass("", "", "", "", "", 0, 0, "", "", [], [], 0)
  model: Opinion = {
    user: "",
    details: "",
    dateOfPurchase: "",
    rate: 0
  }
  cs
  ts
  
  constructor(private service: TravelService, private route: ActivatedRoute, private cartService: CartService, private fireService: FireStoreService) {    
    route.params.subscribe(params => 
      this.fireService.getTravelByKey(params['key']).subscribe(res => this.travel = {
        ...res.payload.data() as {},
        key: res.payload.id
      } as Travel))
    this.cs = cartService
    this.ts = service
  }

  nextImage() { this.imgIndex = (this.imgIndex + 1) % this.travel.allImages.length}
  prevImage() { this.imgIndex = (this.imgIndex - 1 + this.travel.allImages.length) % this.travel.allImages.length}

  changeRate(r: number) {
    // const index = this.ts.travels.indexOf(this.travel)
    // this.ts.travels[index].rate = r
    console.log(this.travel);
    
    this.fireService.updateRate(this.travel, r)
  }

  reserve() : void {
    this.cs.reserve(this.travel) 

    if(this.travel.seats == 0) this.warning = "Brak wolnych miejsc."
    else this.warning = "Zarezerwuj już dziś!"
  }
  

  resign() : void {
    this.cs.resing(this.travel)
    this.warning = "Zarezerwuj już dziś!"
  }

  showForm() {
    this.hideForm = false
    this.model.user = ""
    this.model.details = ""
    this.model.dateOfPurchase = ""
    this.model.rate = 0
  }

  onSubmit() { 
    this.travel.rate = this.model.rate
    const opinion = {
      user: this.model.user,
      details: this.model.details,
      dateOfPurchase: this.model.dateOfPurchase,
      rate: this.model.rate
    }
    this.ts.addOpinion(this.travel, opinion)
    this.hideForm = true
  }

  showDateOfPurchase(d : string) {
    if(d != "") {
      const date = new Date(d)
      return "(kupiono " + date.getUTCDate() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCFullYear() + ")";
    }
    return ""
  }
}
