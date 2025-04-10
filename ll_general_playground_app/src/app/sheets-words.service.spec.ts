import { TestBed } from '@angular/core/testing';

import { SheetsWordsService } from './sheets-words.service';

describe('SheetsWordsService', () => {
  let service: SheetsWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
