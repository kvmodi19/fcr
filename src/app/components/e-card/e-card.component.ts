import { Component, Input, OnInit } from '@angular/core';

import { ServiceProvider } from 'src/app/models/service-provider.model';
import { User } from 'src/app/models/users.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-e-card',
  templateUrl: './e-card.component.html',
  styleUrls: ['./e-card.component.scss'],
})
export class ECardComponent implements OnInit {

  user: User;
  @Input() serviceDetails: ServiceProvider;
  @Input() showNextButton: boolean = false;

  defaultAvatar = 'assets/images/avatar.svg';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
  }

}
