import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-products-modal',
  templateUrl: './add-products-modal.component.html',
  styleUrls: ['./add-products-modal.component.scss'],
})
export class AddProductsModalComponent {

  product = {
    name: '',
    description: '',
    price: 0
  };
  isEdit = false;

  constructor(public modalController: ModalController) { }

  dismissModal(product) {
    this.modalController.dismiss({
      dismissed: true,
      product
    });
  }

}
