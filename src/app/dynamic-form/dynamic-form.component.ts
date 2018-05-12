import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../questions/question-base';
import { QuestionControlService } from '../services/question-control.service';
import { SessionService } from '../services/session.service';



@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
    QuestionControlService,
    SessionService
  ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];

  form: FormGroup;
  payLoad = '';

  constructor(
    private questionControlService: QuestionControlService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}





