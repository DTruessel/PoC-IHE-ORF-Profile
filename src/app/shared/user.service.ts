import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { HttpErrorHandler, HandleError } from '../shared/http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

httpOptions.headers =
  httpOptions.headers.set('Authorization', 'my-new-auth-token');

@Injectable()

export class UserService {
  userUrl = 'https://jsonplaceholder.typicode.com/users';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  /** GET users from the server */
  getUser (): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }

  /* GET users whose name contains search term */
  searchUser(term: string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<User[]>(this.userUrl, options)
      .pipe(
        catchError(this.handleError<User[]>('searchUser', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new user to the database */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  /** DELETE: delete the user from the server */
  deleteUser (id: number): Observable<{}> {
    const url = `${this.userUrl}/${id}`; // DELETE api/users/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }

  /** PUT: update the user on the server. Returns the updated user upon success. */
  updateUser (user: User): Observable<User> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }
}


