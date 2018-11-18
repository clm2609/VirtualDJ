import { TestBed, inject } from '@angular/core/testing';

import { MusicLoaderService } from './music-loader.service';

describe('MusicLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicLoaderService]
    });
  });

  it('should be created', inject([MusicLoaderService], (service: MusicLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
