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
  questionnaireResponse: QuestionnaireResponse;
  formValue = {}
  bundle: Entry;

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

  private formValuesFromDynForm(formData) {

    console.log('--HIER SIND DIE EINGABEN --');// log ist eine methode
    console.log(formData);
    console.log('---------------------------');
    const questionnaireResp = this.bundleService.convertToQuestionnaireResponse(this.questionnaire, formData); //argumente
    console.log('QuestionnaireResp' + questionnaireResp);
  }

  private createBundle() {
    const questionnaireResponse: Entry = {
      resource: {
        resourceType: 'QuestionnaireResponse'
      }
    }
    this.fhirHttpService.create(this.bundle).then(response => {
      console.log(questionnaireResponse);
    })
  }
}

  /**private messageToUser() {
    //HTTP 200 (OK) Questionnaire Resource is returned
    //HTTP 200 (OK) Resource Bundle mit 0 Resultaten is returned
    //HTTP 406 (Not Acceptable) Server kann im verlangen Format _format keine Antwort schicken
    //HTTP 200 (OK) Questionnaire mit gesuchter resourceID gesendet
    //HTTP 404 (Not Found) OperationsOutcome: Resource nicht gefunden

    //  console.log(Object.keys(submittedEvent));          
    //  console.log(Object.values(submittedEvent));


    /**  for (let key in submittedEvent) {
        console.log('Key ' + key);
      }
      for (let value of submittedEvent) {
        console.log('Value ' + value);
      }
      let listeKeys = Object.keys(submittedEvent);
      console.log('Liste Keys:' + listeKeys);
  
      let listeValues = Object.values(submittedEvent);
      console.log('Liste Values:' + listeValues);
  
      for (let keyValuePair in submittedEvent) {
        console.log(keyValuePair, submittedEvent[keyValuePair]);*/
