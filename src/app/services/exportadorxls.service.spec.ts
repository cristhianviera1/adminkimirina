import { TestBed } from '@angular/core/testing';

import { ExportadorxlsService } from './exportadorxls.service';

describe('ExportadorxlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportadorxlsService = TestBed.get(ExportadorxlsService);
    expect(service).toBeTruthy();
  });
});
