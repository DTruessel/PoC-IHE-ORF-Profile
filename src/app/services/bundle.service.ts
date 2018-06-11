import { Injectable } from '@angular/core';
import { FhirJsHttpService } from 'ng-fhirjs';
import { QuestionService } from './question.service';
import { QuestionnaireResponse } from '../models/questionnaire-response';
import { Item } from '../models/item';
import { Answer } from '../models/answer';
import { BundleResource } from '../models/bundle-resource';

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
    //qr.identifier = questionnaire.identifier;
    //qr.basedOn = 'The order, proposal or plan that is fulfilled in whole or in part by this QuestionnaireResponse.';
    //qr.parent = 'A procedure or observation that this questionnaire was performed as part of the execution of.';
    //qr.questionnaire = questionnaire.title;
    //qr.status = 'in-progress | completed | amended | entered-in-error | stopped';
    //qr.subject = 'The subject of the questionnaire response. This could be a patient, organization, practitioner, device, etc.';
    //qr.context = 'The encounter or episode of care with primary association to the questionnaire response.';
    //qr.authored = new Date();
    //qr.author = 'Person who received the answers to the questions in the QuestionnaireResponse and recorded them in the system.';
    //qr.source = 'The person who answered the questions about the subject.';

    qr.questionnaire = { reference: 'Questionnaire/' + questionnaire.id };
    qr.status = 'in-progress';

    return qr;
  }

  extractItem(originalItem: Item, formData: {}) {
    const responseItem = this.makeCopyOfItemQuest(originalItem);
    if (originalItem.type === 'group') {
      responseItem.item = [];
      originalItem.item.forEach(child => responseItem.item.push(this.extractItem(child, formData)));
    } else {
      const Eingabe: string = formData[originalItem.linkId]
      responseItem.answer = [{ valueString: Eingabe }]
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

  createBundleEntry(questionnaireResponse: QuestionnaireResponse) {
    const entry: Entry = {
      resource: questionnaireResponse as IResource,
    }
    this.fhirHttpService.create(entry).then(response => {
      if (response.status = 200) {
        alert('Bundle created ' + ' HTTP ' + response.status + response.headers + ' (OK)')
      }
      else alert(' HTTP ' + response.status)
    })
  }


  //interface Tag { term: string; schema: string; label: string }
  //interface Entry extends Minimal { resource: IResource; category?: Tag[] }

  /*createBundle(questionnaireResponse: QuestionnaireResponse) {
    const entry: Entry = {
      resource: questionnaireResponse as IResource
    }
    this.fhirHttpService.transaction(entry).then(response => {
      if (response.status = 200) {
        alert('Bundle created ' + ' HTTP ' + response.status + response.headers + ' (OK)')
      }
      else alert(' HTTP ' + response.status)
    })
  }*/
}
