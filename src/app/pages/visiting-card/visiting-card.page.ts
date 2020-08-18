import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';

import { Socket } from 'ng-socket-io';

import { environment } from '../../../environments/environment';
import { Professions } from '../../models/users.model';
import { FeedsApiService } from '../../services/api/feeds.api.service';

@Component({
	selector: 'app-visiting-card',
	templateUrl: './visiting-card.page.html',
	styleUrls: [ './visiting-card.page.scss' ],
})
export class VisitingCardPage implements OnInit {

	env = environment;
	selectedSegment = 'about';
	shop: any;
	defaultAvatar = 'assets/images/avatar.svg';
	professions = Professions;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private feedService: FeedsApiService,
		private socket: Socket
	) { }

	ngOnInit() {
		this.route.params.subscribe((params: { id: string }) => {
			this.feedService.getById(params.id)
				.then((response) => {
					this.shop = response.shop;
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	segmentChanged($event) {
		this.selectedSegment = $event.detail.value;
	}

	redirect(page) {
		switch (page) {
			case 'chat': {
				this.router.navigate([ '/home/chat' ]);
			}
		}
	}

	openChatRoom() {
		this.router.navigate([
			'home',
			'chat-room',
			this.shop.user._id
		]);
	}

	sharePageLink() {
		// create share link
	}

}
