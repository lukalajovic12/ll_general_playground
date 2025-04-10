import { TestBed } from '@angular/core/testing';

import { SheetsSentencesService } from './sheets-sentences.service';

describe('SheetsSentencesService', () => {
  let service: SheetsSentencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsSentencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
