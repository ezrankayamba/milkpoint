import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text="Our first Ionic App"
  constructor() {}
  onChangeText(){
    this.text="Changed!"
  }
}
