import { Component } from '@angular/core';
import { TravelService } from '../travel.service';
import { TravelClass } from '../travelClass';

@Component({
  selector: 'app-add-travel-form',
  templateUrl: './add-travel-form.component.html',
  styleUrls: ['./add-travel-form.component.css']
})
export class AddTravelFormComponent {
  ts : TravelService
  model : TravelClass
  submitted : boolean

  constructor(private service : TravelService) {
    this.ts = service
    this.model = new TravelClass(
      "Polskie wakacje", 
      "Polska", 
      "2023-07-13", 
      "2023-07-27", 
      1399, 
      15, 
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam itaque explicabo laudantium ad ratione qui cumque tenetur, natus veniam laborum maiores deleniti eaque quas asperiores distinctio quaerat pariatur facere magnam dolorum sapiente doloribus aperiam? Obcaecati!", 
      "/assets/images/Polska.jpg", 
      5
      )    
    this.submitted = false
  }

  onSubmit() { 
    this.submitted = true 
    this.ts.addTravel(this.model)
    this.model = new TravelClass("", "", "", "", 0, 0, "", "", 0)
  }
  
}
