import { Injectable } from '@angular/core';
import { QuestionBase } from '../questions/question-base';

@Injectable()
export class PrefillService {



  constructor() { }


  prefillQuestion(question) {

    if (question.key === "patient.lastname") {
      question.value === "Rüdisühli";
    }
    if (question.key === "patient.firstname") {
      question.value === "Housi";
    }
  }
}
