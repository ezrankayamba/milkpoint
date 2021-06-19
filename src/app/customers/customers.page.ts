import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  public customers: Observable<Customer[]>;

  constructor(private firestoreService: FirestoreService, public alertCtrl: AlertController, public loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.customers = this.firestoreService.getCustomers();
  }

  async createCustomer(data: Customer){

    const loading = await this.loadingCtrl.create();

    this.firestoreService
    .createCustomer(data.name, data.phone, data.location)
    .then(
      () => {
        loading.dismiss().then(() => {
          // this.router.navigateByUrl('');
          console.log('Success...');
        });
      },
      error => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );

    return await loading.present();
  }
  async showAddCustomerForm() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Customer',
      message: 'Register new customer details',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full name'
        },
        {
          name: 'phone',
          type: 'text',
          placeholder: 'Phone number'
        },
        {
          name: 'location',
          type: 'text',
          placeholder: 'Location'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            this.createCustomer(data);
          }
        }
      ]
    });
    await prompt.present();
  }
}
