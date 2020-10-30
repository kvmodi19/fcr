import { TestBed } from '@angular/core/testing';

import { NotificatonService } from './notificaton.service';

describe('NotificatonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificatonService = TestBed.get(NotificatonService);
    expect(service).toBeTruthy();
  });
});
