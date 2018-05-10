
import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Proof Of Concept IHE ORF';

  constructor(private fhirHttpService: FhirJsHttpService, private router: Router) { }

  getTitle(): string {
    switch (this.router.url) {
      case '/patients-list':
        return this.title + ' - ' + 'Patients';
      case '/CapabilityStatement':
        return this.title + ' - ' + 'CapabilityStatement';
      case '/settings':
        return this.title + ' - ' + 'Settings';
      case '/questionnaires':
        return this.title + ' - ' + 'Questionnaires';
      case '/dynamic-form-question':
        return this.title + ' - ' + 'Dynamic Form';
    }
    return this.title;
  }


}
