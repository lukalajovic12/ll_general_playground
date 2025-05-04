import { TestBed } from '@angular/core/testing';

import { SheetsCardsService } from './sheets-cards.service';

describe('SheetsCardsService', () => {
  let service: SheetsCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
