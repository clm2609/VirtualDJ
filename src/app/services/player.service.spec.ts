import { TestBed, inject } from '@angular/core/testing';

import { PlayerServiceService } from './player-service.service';

describe('PlayerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerServiceService]
    });
  });

  it('should be created', inject([PlayerServiceService], (service: PlayerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
