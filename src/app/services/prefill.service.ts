import { Injectable } from '@angular/core';
import { QuestionBase } from '../questions/question-base';
import { QuestionGroup } from '../questions/question-group';

@Injectable()
export class PrefillService {

  questions: QuestionBase<any>[]

  constructor() { }

  prefillQuestion(questions: QuestionBase<any>[]) {
    questions.forEach(question => this.prefill(question));
  }

  private prefill(question: QuestionBase<any>) {
    if (question.controlType === 'group') {
      (question as QuestionGroup).children.forEach(child => this.prefill(child));
    } else {
      if (question.key === 'patient.lastname') {
        question.value = 'Rüdisühli';
      } else if (question.key === 'patient.firstname') {
        question.value = 'Housi';
      } else if (question.key === 'orderer.dataenterer.lastname') {
        question.value = 'Dr. Frankenstein';
      }
      // TODO more fields...
    }


  }

}





/*  prefillQuestionWithValue(question: QuestionBase<any>) {
    if (question.key = "patient.lastname") {
      question.value = "Rüdisühli";
      console.log(question.key + ' ' + question.value)
    }
    if (question.key = "patient.firstname") {
      question.value = "Housi";
      console.log(question.key + ' ' + question.value)
    }

  }*/
