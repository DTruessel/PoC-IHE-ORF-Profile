import { Component, OnInit } from '@angular/core';
import { HttpService, Config } from '../shared/http.service';
import { MessageService } from '../shared/message.service';


@Component({
  selector: 'app-http-config',
  templateUrl: './http-config.component.html',
  styleUrls: ['./http-config.component.css'],
  styles: ['.error {color: red;}']
})
export class HttpConfigComponent implements OnInit {

  error: any;
  headers: string[];
  config: Config;

  constructor(private httpService: HttpService) { }

  ngOnInit() {}

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.httpService.getConfig()
      .subscribe(
        data => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showConfig_v1() {
    this.httpService.getConfig_1()
      .subscribe(data => this.config = {
        patientsUrl: data['patientsUrl'],
          textfile:  data['textfile']
      });
  }

  showConfig_v2() {
    this.httpService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe(data => this.config = { ...data });
  }

  showConfigResponse() {
    this.httpService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
  makeError() {
    this.httpService.makeIntentionalError().subscribe(null, error => this.error = error );
  }












}
