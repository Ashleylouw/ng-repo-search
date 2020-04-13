import { TestBed } from '@angular/core/testing';

import { RepoService } from './repo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RepoService', () => {
  let service: RepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [RepoService]
    });

    service = TestBed.get(RepoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRepo', () => {
    it('should get repositories based on search term', (done) => {
      service.getRepo('test').subscribe(
          () => done(),
          error => fail(`Failed to retrieve repositories. Error: ${error}`)
      );
      const req = httpMock.expectOne('https://api.github.com/search/repositories?q=test');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
    xit('should get repositories based on search term', (done) => {
      service.getRepo('test').subscribe(
          () => done(),
          error => fail(`Failed to retrieve repositories. Error: ${error}`)
      );
      const req = httpMock.expectOne('https://api.github.com/search/repositories?q=test');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  })
});
