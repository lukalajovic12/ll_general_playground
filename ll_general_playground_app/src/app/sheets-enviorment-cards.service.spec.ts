import { TestBed } from '@angular/core/testing';

import { SheetsEnviormentCardsService } from './sheets-enviorment-cards.service';

describe('SheetsEnviormentCardsService', () => {
  let service: SheetsEnviormentCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsEnviormentCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
