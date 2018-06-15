import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Proof Of Concept IHE ORF Profil';

  constructor(private fhirHttpService: FhirJsHttpService, private router: Router) { }

  getTitle(): string {

    switch (this.router.url) {
      case '/home':
        return this.title + ' - ' + 'Home';
      case '/capabilityStatement':
        return this.title + ' - ' + 'Capability Statement';
      case '/settings':
        return this.title + ' - ' + 'Settings';
      case '/questionnaires-list':
        return this.title + ' - ' + 'Questionnaires';
      case '/messages':
        return this.title + ' - ' + 'Messages';
    }
    return this.title;
  }
}
