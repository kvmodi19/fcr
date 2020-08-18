import {
	async,
	ComponentFixture,
	TestBed
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceProviderDetailPage } from './service-provider-detail.page';

describe(
	'ServiceProviderDetailPage',
	() => {
		let component: ServiceProviderDetailPage;
		let fixture: ComponentFixture<ServiceProviderDetailPage>;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [ ServiceProviderDetailPage ],
				imports: [ IonicModule.forRoot() ]
			})
				   .compileComponents();

			fixture = TestBed.createComponent(ServiceProviderDetailPage);
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
