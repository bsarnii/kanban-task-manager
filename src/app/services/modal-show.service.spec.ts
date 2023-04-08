import { TestBed } from '@angular/core/testing';

import { ModalShowService } from './modal-show.service';

describe('ModalShowService', () => {
  let service: ModalShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
