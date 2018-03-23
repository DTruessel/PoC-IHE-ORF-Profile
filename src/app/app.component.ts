import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Proof Of Concept IHE ORF';

  constructor(private fhirHttpService: FhirJsHttpService, private router: Router) {
  }

  getTitle(): string {
    switch (this.router.url) {
      case '/login':
        return this.title + ' - ' + 'Login';
      case '/form':
        return this.title + ' - ' + 'Forms';
      case '/patients':
        return this.title + ' - ' + 'Patients';
      case '/CapabilityStatement':
        return this.title + ' - ' + 'CapabilityStatement';
      case '/settings':
        return this.title + ' - ' + 'Settings';
      case '/questionnaire01':
        return this.title + ' - ' + 'Questionnaire01';
    }
    return this.title;
  }



}
