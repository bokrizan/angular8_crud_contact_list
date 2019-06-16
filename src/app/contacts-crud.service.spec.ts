import { TestBed } from '@angular/core/testing';

import { ContactsCrudService } from './contacts-crud.service';

describe('ContactsCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsCrudService = TestBed.get(ContactsCrudService);
    expect(service).toBeTruthy();
  });
});
