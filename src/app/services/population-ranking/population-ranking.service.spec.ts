import { TestBed } from '@angular/core/testing';

import { PopulationRankingService } from './population-ranking.service';

describe('PopulationRankingService', () => {
  let service: PopulationRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
