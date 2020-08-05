import {
	Component,
	OnInit
} from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-search-modal',
	templateUrl: './search-modal.component.html',
	styleUrls: [ './search-modal.component.scss' ],
})
export class SearchModalComponent implements OnInit {

	search: string;
	searchBy = 'any';
	searchByOptions = [
		{
			display: 'Any',
			value: 'any'
		},
		{
			display: 'Country',
			value: 'country'
		},
		{
			display: 'City',
			value: 'city'
		},
		{
			display: 'Pincode',
			value: 'pincode'
		},
	];

	constructor(public modalController: ModalController) { }

	ngOnInit() {}

	dismissModal(search) {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalController.dismiss({
			dismissed: true,
			search: {
				searchBy: this.searchBy,
				text: search || ''
			}
		});
	}

}
