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
      } else if (question.key === 'patient.pid') {
        question.value = '56478945687';
      } else if (question.key === 'patient.birthdate') {
        question.value = '01.07.1957';
      } else if (question.key === 'patient.casenumber') {       //sollte Laufnummer sein
        question.value = '03';
      } else if (question.key === 'orderer.dataenterer.visum') {
        question.value = 'SB';
      } else if (question.key === 'orderer.dataenterer.bereich') {
        question.value = 'Ärztezentrum Ämmitau';
      } else if (question.key === 'orderer.dataenterer.lastname') {
        question.value = 'Dr. Bohnebluescht';
      } else if (question.key === 'orderer.dataenterer.firstname') {
        question.value = 'Susi';
      } else if (question.key === 'orderer.dataenterer.tel') {
        question.value = '035 123 45 67';
      } else if (question.key === 'orderer.dataenterer.e-mail') {
        question.value = 's.bohnebluscht@doctors.com';
      } else if (question.key === 'orderer.dataenterer.street') {
        question.value = 'Ämmitaustrasse 1';
      } else if (question.key === 'orderer.dataenterer.zip') {
        question.value = '3501';
      } else if (question.key === 'orderer.dataenterer.city') {
        question.value = 'Bordlef';
      } else if (question.key === 'command.partner.info') {
        question.value = 'Bilder und Befunde können per Ebida bestellt werden';
      }
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
