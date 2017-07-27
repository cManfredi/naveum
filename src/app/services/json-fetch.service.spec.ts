import { TestBed, inject } from '@angular/core/testing';

import { JsonFetchService } from './json-fetch.service';

describe('JsonFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonFetchService]
    });
  });

  it('should be created', inject([JsonFetchService], (service: JsonFetchService) => {
    expect(service).toBeTruthy();
  }));
});
