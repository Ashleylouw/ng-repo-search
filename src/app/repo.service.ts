import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  /**
   * Constructor.
   *
   * @param { HttpClient } httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Returns repositories based on the search term that was passed.
   *
   * @param { string } searchTerm
   */
  public getRepo(searchTerm: string): Observable<any> {
      return this.httpClient.get(`https://api.github.com/search/repositories?q=${searchTerm}`)
        .pipe(
          catchError(err => throwError(err))
        )
  }
}
