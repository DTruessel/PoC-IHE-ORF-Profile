import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../questions/question-base';
import { QuestionControlService } from '../services/question-control.service';
import { SessionService } from '../services/session.service';
import { Item } from '../models/item';
import { ParserService } from '../services/parser.service';
import { QuestionService } from '../services/question.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
    QuestionControlService,
  ],

})

export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  payLoad = '';

  @Input() questions: QuestionBase<any>[] = [];
  @Input() selectedQuestionnaire = this.sessionService.selectedQuestionnaire;

  constructor(
    private questionControlService: QuestionControlService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private questionService: QuestionService,
  ) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);

  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}





