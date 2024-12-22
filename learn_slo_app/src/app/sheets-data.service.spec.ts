import { TestBed } from '@angular/core/testing';

import { SheetsDataService } from './sheets-data.service';

describe('SheetsDataService', () => {
  let service: SheetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
