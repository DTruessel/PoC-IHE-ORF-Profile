import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../questions/question-base';
import { QuestionControlService } from '../services/question-control.service';
import { SessionService } from '../services/session.service';
import { Item } from '../models/item';
import { ParserService } from '../services/parser.service';
import { QuestionService } from '../services/question.service';
import { FhirJsHttpService } from 'ng-fhirjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
  ],

})

export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  payLoad = '';
  private data$: BehaviorSubject<fhir.Bundle>;

  @Input() questions: QuestionBase<any>[] = [];
  @Input() selectedQuestionnaire = this.sessionService.selectedQuestionnaire;

  // @Output();

  constructor(
    private questionControlService: QuestionControlService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private questionService: QuestionService,
    private fhirHttpService: FhirJsHttpService,
  ) {
    this.data$ = new BehaviorSubject(null);
  }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  onSubmit() {
    let questionnaireResponse = this.sessionService.selectedQuestionnaire
    this.fhirHttpService.create(questionnaireResponse).then(response => {
      this.data$.next(<fhir.Bundle>response.data);
      console.log(response.data);
    })

    this.payLoad = JSON.stringify(this.form.value);
    console.log(this.payLoad);
    //ein versuch, die questionnaireResponse zu erstellen
    //return Object.assign({}, this.payLoad, selectedQuestionnaire);
    // const p = Object.assign({}, this.payLoad, selectedQuestionnaire);
    // console.log(p);
  }




  /* onSubmit() {
     const selectedQuestionnaire = this.sessionService.selectedQuestionnaire;
     this.payLoad = JSON.stringify(this.form.value);
     console.log(this.payLoad);
     //ein versuch, die questionnaireResponse zu erstellen
     return Object.assign({}, this.payLoad, selectedQuestionnaire);
     // const p = Object.assign({}, this.payLoad, selectedQuestionnaire);
     // console.log(p);
   }*/
}





