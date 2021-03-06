import { Component, OnInit } from '@angular/core';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';

export const FHIR_JS_CONFIG: FhirConfig = {
  baseUrl: 'http://fhirtest.uhn.ca/baseDstu3',
  credentials: 'same-origin'
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  fhirServers = ['http://test.fhir.org/r3',
    'http://localhost:8080/baseDstu3',
    'http://vonk.furore.com',
    'http://fhirtest.uhn.ca/baseDstu3'
  ];

  constructor(private fhirHttpService: FhirJsHttpService) { }

  ngOnInit() {
  }

  getSelectedValue(): string {
    return FHIR_JS_CONFIG.baseUrl;
  }

  setSelectedValue(value: string) {
    FHIR_JS_CONFIG.baseUrl = value;
    this.fhirHttpService.updateConfig(FHIR_JS_CONFIG);
  }

}
