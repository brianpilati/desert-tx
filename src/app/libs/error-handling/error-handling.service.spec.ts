import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handling.service';

describe('ErrorHandlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerService]
    });
  });

  it('should be created', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
