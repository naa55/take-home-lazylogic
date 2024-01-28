import { TestBed } from '@angular/core/testing';

import { CtmossService } from './ctmoss.service';

describe('CtmossService', () => {
  let service: CtmossService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtmossService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
