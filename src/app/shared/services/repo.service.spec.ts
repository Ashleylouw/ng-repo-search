import { TestBed } from '@angular/core/testing';

import { RepoService } from './repo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('RepoService', () => {
  let service: RepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RepoService
      ]
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
          () => done()
        );

      const req = httpMock.expectOne('https://api.github.com/search/repositories?q=test&per_page=100');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
    it('should error when trying get repositories based on a search term', async () => {
      const err = {
        title: 'Error',
        message: 'Failed to retrieve repositories.'
      }

      let errSpy = spyOn(service, 'getRepo').and.returnValue(throwError(err));

      try {
        await service.getRepo('test').toPromise();
      } catch(error) {
        expect(errSpy).toHaveBeenCalledWith('test');
        expect(error.title).toEqual('Error');
        expect(error.message).toEqual('Failed to retrieve repositories.');
      }
    });
  });
  describe('getSelectedRepoIssues', () => {
    it('should get repository issues based on selected repository name', (done) => {
      service.getSelectedRepoIssues('twbs/bootstrap').subscribe(
          () => done()
        );

      const req = httpMock.expectOne('https://api.github.com/repos/twbs/bootstrap/issues?state=all&per_page=100');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
    it('should error when trying to get repositoriy issues based on a selected repository name', async () => {
      const err = {
        title: 'Error',
        message: 'Failed to retrieve issues for repository.'
      }
      let errSpy = spyOn(service, 'getSelectedRepoIssues').and.returnValue(throwError(err));

      try {
        await service.getSelectedRepoIssues('twbs/bootstrap').toPromise();
      } catch(error) {
        expect(errSpy).toHaveBeenCalledWith('twbs/bootstrap');
        expect(error.title).toEqual('Error');
        expect(error.message).toEqual('Failed to retrieve issues for repository.');
      }
    });
  })
});
