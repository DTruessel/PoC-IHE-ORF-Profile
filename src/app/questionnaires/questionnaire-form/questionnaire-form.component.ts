import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { SessionService } from '../../services/session.service';
import { Item } from '../../models/item';
import { QuestionBase } from '../../questions/question-base';
import { ParserService } from '../../services/parser.service';
import { Questionnaire } from '../../models/questionnaire';
import { Router } from '@angular/router';
import { QuestionnaireResponse } from '../../models/questionnaire-response';
import { BundleService } from '../../services/bundle.service';
import { FhirJsHttpService } from 'ng-fhirjs';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css'],

})
export class QuestionnaireFormComponent implements OnInit {

  @Input()

  questions: any[];
  questionnaire: Questionnaire;
  formValue = {}
  bundle: fhir.Bundle;
  resource: QuestionnaireResponse;

  constructor(
    private questionService: QuestionService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private router: Router,
    private bundleService: BundleService,
    private fhirHttpService: FhirJsHttpService,
    private messageService: MessageService,
  ) {

    const rawQ = this.sessionService.selectedQuestionnaire;
    if (rawQ) {
      this.questionnaire = this.parserService.convertToQuestionnaire(rawQ);
      this.questions = this.questionService.getQuestions(this.questionnaire);
    }
    else {                                                                  // neu 18.05.2018
      alert('No Questionnaire found in Session');
      // Navigation zur Suche ?! ev link zum wieder suchen
      this.router.navigate(['/questionnaires-list']);                                     // neu 18.05.2018
    }
  }

  ngOnInit() { }

  private formDataFromDynForm(formData) {

    console.log('--HIER SIND DIE EINGABEN --');// log ist eine methode
    console.log(formData);
    console.log('---------------------------');
    const questionnaireResp = this.bundleService.convertToQuestionnaireResponse(this.questionnaire, formData); //argumente
    const bundle = this.createBundle(questionnaireResp);
    console.log('QuestionnaireResp' + questionnaireResp);
  }

  private createBundle(questionnaireResp: QuestionnaireResponse) {
    const bundleQR: Entry = {
      resource: {
        'resourceType': 'QuestionnaireResponse',
        'text': {
          'status': 'generated',
          'div': '<div xmlns=\'http://fhirtest.uhn.ca/baseDstu3\'>questionnaireResp</div>'
        },
      }
    }
    this.fhirHttpService.create(bundleQR).then(response => {
      let message = response.status;
      console.log(bundleQR);
      console.log(response.status);
      alert('Bundle created' + '' + message)
      return this.fhirHttpService.create(bundleQR);
    })
  }
}

