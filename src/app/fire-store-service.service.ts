import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Purchase } from './purchase';
import { Reservation } from './reservation';
import { Travel } from './travel';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(private db: AngularFirestore) { }

  getTravels() {
    return this.db.collection("Wycieczki").snapshotChanges()
  }

  getTravelByKey(key: string) {
    return this.db.collection("Wycieczki").doc(key).snapshotChanges()
  }

  getReservations() {
    return this.db.collection("Rezerwacje").snapshotChanges()
  }

  getPurchases() {
    return this.db.collection("Zakupy").snapshotChanges()
  }

  newReservation(r: Reservation) {        
    this.db.collection("Rezerwacje").add({
      name: r.name,
      destination: r.destination,
      startDate: r.startDate,
      endDate: r.endDate,
      price: r.price,
      seats: r.seats,
      travelKey: r.travelKey
    })
  }

  updateReservation(key: string, numberOfSeats: number) {    
    this.db.collection("Rezerwacje").doc(key).update({seats: numberOfSeats})
  }

  changeSeats(travelKey: string, seats: number) {
    this.db.collection("Wycieczki").doc(travelKey).update({seats: seats})
  }

  deleteReservation(key: string) {
    this.db.collection("Rezerwacje").doc(key).delete()
  }

  newPurchase(r: Purchase) {    
    this.db.collection("Zakupy").add({
      name: r.name,
      destination: r.destination,
      startDate: r.startDate,
      endDate: r.endDate,
      dateOfPurchase: r.dateOfPurchase,
      price: r.price,
      seats: r.seats,
      travelKey: r.travelKey
    })
  }

  updatePurchase(key: string, numberOfSeats: number) {
    this.db.collection("Zakupy").doc(key).update({seats: numberOfSeats})
  }
  
  addOpinion(t: Travel) {
    this.db.collection("Wycieczki").doc(t.key).update({opinions: t.opinions})
  }

  updateRate(t: Travel, r: number) {    
    this.db.collection("Wycieczki").doc(t.key).update({rate: r})
  }

  addTravel(t: Travel) {
    this.db.collection("Wycieczki").add({
      name: t.name,
      destination: t.destination,
      startDate: t.startDate,
      endDate: t.endDate,
      seats: t.seats,
      price: t.price,
      description: t.description,
      imgLink: t.imgLink,
      allImages: t.allImages,
      opinions: t.opinions,
      rate: t.rate
    })
  }

  deleteTravel(key: string) {
    this.db.collection("Wycieczki").doc(key).delete()
  }
}
