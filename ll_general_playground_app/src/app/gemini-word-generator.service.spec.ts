import { TestBed } from '@angular/core/testing';

import { GeminiWordGeneratorService } from './gemini-word-generator.service';

describe('GeminiWordGeneratorService', () => {
  let service: GeminiWordGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiWordGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
