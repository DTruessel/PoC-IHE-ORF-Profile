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
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [],

})

export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  payLoad: any;

  @Input() questions: QuestionBase<any>[] = [];
  @Input() selectedQuestionnaire = this.sessionService.selectedQuestionnaire;

  @Output() formData = new EventEmitter();

  constructor(
    private questionControlService: QuestionControlService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private questionService: QuestionService,
    private fhirHttpService: FhirJsHttpService,
  ) {
  }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  emitFormData() {
    console.log(this.form.value);
    this.formData.emit(this.form.value);
  }
}




