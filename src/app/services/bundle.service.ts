import { Injectable } from '@angular/core';
import { FhirJsHttpService } from 'ng-fhirjs';
import { QuestionService } from './question.service';
import { QuestionnaireResponse } from '../models/questionnaire-response';
import { Item } from '../models/item';

@Injectable()
export class BundleService {


  constructor(
    private fhirHttpService: FhirJsHttpService,
    private questionService: QuestionService
  ) { }

  convertToQuestionnaireResponse(questionnaire, formData): QuestionnaireResponse {
    let qr = this.extractQuestionnaireHeader(questionnaire);
    qr.items = [];
    let item: Item;

    //Kopieren der Items, die direkt in der Items-Liste des Questionnnaires sind - noch ohne Antworten
    questionnaire.item.forEach(i => qr.items.push(this.makeCopyOfItemQuest(item)));

    //Setzen der Antwort aus formData in die Liste mit den kopierten Items = qr.items

    console.log(qr)

    return qr;
  }

  extractQuestionnaireHeader(questionnaire): QuestionnaireResponse {
    let qr = new QuestionnaireResponse();
    qr.identifier = questionnaire.identifier;
    qr.basedOn = 'The order, proposal or plan that is fulfilled in whole or in part by this QuestionnaireResponse.';
    qr.parent = 'A procedure or observation that this questionnaire was performed as part of the execution of.';
    qr.questionnaire = questionnaire.title;
    qr.status = 'in-progress | completed | amended | entered-in-error | stopped';
    qr.subject = 'The subject of the questionnaire response. This could be a patient, organization, practitioner, device, etc.';
    qr.context = 'The encounter or episode of care with primary association to the questionnaire response.';
    qr.authored = new Date();
    qr.author = 'Person who received the answers to the questions in the QuestionnaireResponse and recorded them in the system.';
    qr.source = 'The person who answered the questions about the subject.';

    return qr;
  }

  extractItem(item, formData) {
    let itemResponse: Item
    let itemsGroup = [];

    if (item.item) {
      itemResponse.answer = formData[item.linkId];
      item.item.forEach(i => itemsGroup.push(this.makeCopyOfItemQuest(i)));
    }

    if (item.type = 'group') {
      item.forEach(i => itemsGroup.push(this.makeCopyOfItemQuest(i)));
    }

    return itemResponse;
  }

  makeCopyOfItemQuest(item) {

    let itemCopy: Item = new Item();

    itemCopy.linkId = item.linkId;
    itemCopy.definition = item.definition;
    itemCopy.code = item.code;
    itemCopy.prefix = item.prefix;
    itemCopy.text = item.text;
    itemCopy.type = item.type;
    itemCopy.answer = '';

    return itemCopy
  }

}  