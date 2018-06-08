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
import { PrefillService } from '../../services/prefill.service';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css'],

})
export class QuestionnaireFormComponent implements OnInit {

  @Input()

  questions: any[];
  questionnaire: Questionnaire;
  bundle: fhir.Bundle;
  resource: QuestionnaireResponse;
  question: QuestionBase<any>

  constructor(
    private questionService: QuestionService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private router: Router,
    private bundleService: BundleService,
    private fhirHttpService: FhirJsHttpService,
    private messageService: MessageService,
    private prefillService: PrefillService,
  ) {

    const rawQ = this.sessionService.selectedQuestionnaire;

    if (rawQ) {

      this.questionnaire = this.parserService.convertToQuestionnaire(rawQ);
      this.questions = this.questionService.getQuestions(this.questionnaire);
      this.prefillService.prefillQuestion(this.questions);
    }
    else {
      alert('No Questionnaire found in Session');
      // Navigation zur Suche ?! ev link zum wieder suchen
      this.router.navigate(['/questionnaires-list']);
    }
  }

  ngOnInit() { }

  private formDataFromDynForm(formData) {

    console.log('--HIER SIND DIE EINGABEN --');
    console.log(formData);
    console.log('---------------------------');
    const questionnaireResp = this.bundleService.convertToQuestionnaireResponse(this.questionnaire, formData); //argumente
    const bundle = this.bundleService.createBundle(questionnaireResp);
  }
}
