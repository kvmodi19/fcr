import { Component, Input } from '@angular/core';
import { ServiceProvider } from 'src/app/models/service-provider.model';

@Component({
  selector: 'app-e-card',
  templateUrl: './e-card.component.html',
  styleUrls: ['./e-card.component.scss'],
})
export class ECardComponent {

  @Input() serviceDetails: ServiceProvider;
  @Input() showNextButton: boolean = false;

  defaultAvatar = 'assets/images/avatar.svg';

  constructor() { }

}
