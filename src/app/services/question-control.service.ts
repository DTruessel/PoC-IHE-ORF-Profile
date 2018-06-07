
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { QuestionBase } from '../questions/question-base';
import { QuestionGroup } from '../questions/question-group';
import { Patient } from '../models/patient';
import { PatientService } from './patient.service';


@Injectable()
export class QuestionControlService {

  selectedPatient: Patient;

  constructor(
    private patientService: PatientService) { }

  toFormGroup(questions: QuestionBase<any>[]) {    //FormGroup: Tracks the value and validity state of a group of FormControl instances
    let controls: {} = {};

    questions.forEach(question => this.addFormControlForQuestion(question, controls));

    return new FormGroup(controls);
  }

  addFormControlForQuestion(question: QuestionBase<any>, controls: {}) {
    if (question.controlType === 'group') {
      controls[question.key] = new FormControl(); // Dummy
      (question as QuestionGroup).children.forEach(question => this.addFormControlForQuestion(question, controls));
    }
    if (controls[question.key] === 'patient.lastname') {
      controls[question.key] = new FormControl('Rüdisühli');
    }
    else {
      controls[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    }
  }
}


