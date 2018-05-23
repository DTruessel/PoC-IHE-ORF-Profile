import { Component, OnInit } from '@angular/core';
import { FhirJsHttpService, FHIR_HTTP_CONFIG } from 'ng-fhirjs';

@Component({
  selector: 'app-questionnaire-response',
  templateUrl: './questionnaire-response.component.html',
  styleUrls: ['./questionnaire-response.component.css']
})
export class QuestionnaireResponseComponent implements OnInit {

  constructor(
    private fhirHttpService: FhirJsHttpService,
  ) {
    //this.fhirHttpService.create(entry: Entry): Promise<ResponseObj>;    
  }

  ngOnInit() {
  }


}
