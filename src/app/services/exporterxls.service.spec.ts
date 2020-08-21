import { TestBed } from '@angular/core/testing';

import { ExporterxlsService } from './exporterxls.service';

describe('ExporterxlsService', () => {
  let service: ExporterxlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExporterxlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
