import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TravelComponent } from './travel/travel.component';
import { TravelsComponent } from './travels/travels.component';
import { RatingComponent } from './rating/rating.component';
import { FiltersComponent } from './filters/filters.component';
import { DestinationFilterComponent } from './destination-filter/destination-filter.component';
import { FilterPipe } from './filterPipe';
import { TravelService } from './travel.service';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';
import { AddTravelFormComponent } from './add-travel-form/add-travel-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelComponent,
    TravelsComponent,
    RatingComponent,
    FiltersComponent,
    DestinationFilterComponent, 
    FilterPipe, PriceFilterComponent, DateFilterComponent, RatingFilterComponent, AddTravelFormComponent, CartComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    FormsModule
  ],
  providers: [TravelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
