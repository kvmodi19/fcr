import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-search-modal',
	templateUrl: './search-modal.component.html',
	styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent {

	search = {
		text: '',
		country: '',
		city: '',
		pinCode: ''
	};

	constructor(public modalController: ModalController) { }

	dismissModal(search) {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalController.dismiss({
			dismissed: true,
			search: {
				...search
			}
		});
	}

}
