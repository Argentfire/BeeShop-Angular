import { TestBed } from '@angular/core/testing';

import { CartControlService } from './cart-control.service';

describe('CartControlService', () => {
  let service: CartControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
