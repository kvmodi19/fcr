import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowECardPage } from './show-e-card.page';

describe('ShowECardPage', () => {
  let component: ShowECardPage;
  let fixture: ComponentFixture<ShowECardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowECardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowECardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
