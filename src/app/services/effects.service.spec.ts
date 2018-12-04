import { TestBed, inject } from '@angular/core/testing';

import { EffectsService } from './effects.service';

describe('EffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EffectsService]
    });
  });

  it('should be created', inject([EffectsService], (service: EffectsService) => {
    expect(service).toBeTruthy();
  }));
});
