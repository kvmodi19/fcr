import {
	async,
	ComponentFixture,
	TestBed
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitingCardPage } from './visiting-card.page';

describe(
	'VisitingCardPage',
	() => {
		let component: VisitingCardPage;
		let fixture: ComponentFixture<VisitingCardPage>;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [ VisitingCardPage ],
				imports: [ IonicModule.forRoot() ]
			})
				   .compileComponents();

			fixture = TestBed.createComponent(VisitingCardPage);
			component = fixture.componentInstance;
			fixture.detectChanges();
		}));

		it(
			'should create',
			() => {
				expect(component)
					.toBeTruthy();
			}
		);
	}
);
