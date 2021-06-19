import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}

  createCustomer(
    name: string,
    phone?: string,
    location?: string
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`customers/${id}`).set({
      id,
      name,
      phone,
      location,
    });
   }
   getCustomers(): Observable<Customer[]> {
    return this.firestore.collection<Customer>(`customers`).valueChanges();
  }
}
