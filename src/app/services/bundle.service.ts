import { Injectable } from '@angular/core';
import { FhirJsHttpService } from 'ng-fhirjs';
import { QuestionService } from './question.service';
import { QuestionnaireResponse } from '../models/questionnaire-response';
import { Item } from '../models/item';
import { Answer } from '../models/answer';

@Injectable()

export class BundleService {


  constructor(
    private fhirHttpService: FhirJsHttpService,
    private questionService: QuestionService
  ) { }

  convertToQuestionnaireResponse(questionnaire, formData): QuestionnaireResponse {
    const qr = this.extractQuestionnaireHeader(questionnaire);
    qr.item = [];
    let item: Item;
    questionnaire.item.forEach(i => qr.item.push(this.extractItem(i, formData)));
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

  extractItem(originalItem: Item, formData: {}) {
    const responseItem = this.makeCopyOfItemQuest(originalItem);
    if (originalItem.type === 'group') {
      responseItem.item = [];
      originalItem.item.forEach(child => responseItem.item.push(this.extractItem(child, formData)));
    } else {
      responseItem.answer = formData[originalItem.linkId];
    }
    return responseItem;
  }

  makeCopyOfItemQuest(item): Item {
    let itemCopy: Item = new Item();
    itemCopy.linkId = item.linkId;
    itemCopy.definition = item.definition;
    itemCopy.code = item.code;
    itemCopy.prefix = item.prefix;
    itemCopy.text = item.text;
    itemCopy.type = item.type;
    return itemCopy
  }

  createBundle(questionnaireResponse: QuestionnaireResponse) {
    const bundleQR: Entry = {
      resource: questionnaireResponse as IResource
    }
    this.fhirHttpService.create(bundleQR).then(response => {
      alert(' HTTP ' + response.status)
    })
  }
}



    /*this.fhirHttpService.create(bundleQR).then(response => {
      if (response.status = 200) {
        alert('Bundle created ' + ' HTTP ' + response.status + ' (OK)')
      }
      if (response.status = 406) {
        alert('Server kann im verlangen Format _format keine Antwort schicken' + ' HTTP ' + response.status + ' (Not Acceptable)')
      }
      if (response.status = 404) {
        alert('OperationsOutcome: Resource nicht gefunden' + ' HTTP ' + response.status + ' (Not Found)')
      }
      else {

      }
    })*/
