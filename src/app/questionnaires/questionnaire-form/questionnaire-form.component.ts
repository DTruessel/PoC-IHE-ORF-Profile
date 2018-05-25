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

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css'],

})
export class QuestionnaireFormComponent implements OnInit {

  @Input()
  @Output() questToQuestResponse = new EventEmitter();

  questions: any[];
  questionnaire: Questionnaire;
  questionnaireResponse: QuestionnaireResponse;
  formValue = {};

  constructor(
    private questionService: QuestionService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private router: Router,
    private bundleService: BundleService,
    private fhirHttpService: FhirJsHttpService,
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

  private formValuesFromDynForm(submittedEvent) {                                       //FormValues aus dynamic-form
    console.log('--HIER SIND DIE EINGABEN --');
    console.log(submittedEvent);
    console.log('---------------------------');
    const questionnaireResp = this.bundleService.convertToQuestionnaireResponse(this.questionnaire, submittedEvent);
  }

  /*private convertformValueToQuestResponse() {
    this.questionnaireResponse = this.bundleService.convertToQuestionnaireResponse(this.formValue);
  }*/

  private createQuestionnaireResponse(formValue) {
    const questionnaireResponse: Entry = {
      resource: {
        resourceType: 'QuestionnaireResponse'

      }
    }
    this.fhirHttpService.create(questionnaireResponse);
    console.log(questionnaireResponse);
  }

}



//submit form.value
//
