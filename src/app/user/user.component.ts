import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';



interface UserResponse {
  login: string;
  bio: string;
  company: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  title = 'app';
  results = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
      this.httpClient.get<UserResponse>('https://api.github.com/users/DTruessel').subscribe(
        data => {
        console.log('User Login:' + data.login);
        console.log('Bio:' + data.bio);
        console.log('Company:' + data.company);
      },
        (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        console.log('Error occured');
      }
    );
  }
}


/*https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b*/
