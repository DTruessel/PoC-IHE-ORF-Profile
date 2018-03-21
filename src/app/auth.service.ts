import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  baseUrl: 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    return this.http.post<any>('http://localhost:8080/token/generate-token', credentials);
  }

}
