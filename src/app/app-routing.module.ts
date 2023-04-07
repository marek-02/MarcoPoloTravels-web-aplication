import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTravelFormComponent } from './add-travel-form/add-travel-form.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { MainViewComponent } from './main-view/main-view.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { TravelComponent } from './travel/travel.component';
import { TravelsViewComponent } from './travels-view/travels-view.component';
import { TravelsComponent } from './travels/travels.component';


const routes: Routes = [
  {path: 'travels/add', component: AddTravelFormComponent},
  {path: 'travels/:key', component: TravelDetailsComponent},
  {path: 'travels', component: TravelsViewComponent},
  {path: 'orders', component: HistoryComponent},
  {path: 'cart', component: CartDetailsComponent},
  {path: 'user', component: CartComponent},
  {path: '', component: MainViewComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
