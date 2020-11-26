import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-reward-modal',
  templateUrl: './add-reward-modal.component.html',
  styleUrls: ['./add-reward-modal.component.scss'],
})
export class AddRewardModalComponent {

  reward = {
    name: '',
    description: '',
  };
  isEdit = false;

  constructor(public modalController: ModalController) { }

  dismissModal(reward) {
    this.modalController.dismiss({
      dismissed: true,
      reward
    });
  }

}
