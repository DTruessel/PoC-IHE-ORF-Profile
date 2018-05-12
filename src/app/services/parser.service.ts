import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { SessionService } from './session.service';
import { Questionnaire } from '../models/questionnaire';

@Injectable()
export class ParserService {

  obj: any;

  constructor(
    private sessionService: SessionService,
  ) { }

  convertToQuestionnaire(obj: any): Questionnaire {
    obj = this.sessionService.selectedQuestionnaire;
    let q = this.extractQuestionnaireHeader(obj);
    q.items = [];
    obj.item.forEach(i => q.items.push(this.extractItem(i)));
    return q;
  }

  private extractQuestionnaireHeader(selectedQuestionnaire: any): Questionnaire {
    let q = new Questionnaire();
    q.id = selectedQuestionnaire.id;
    let text = 'Status: [' + selectedQuestionnaire.text.status + '] - Note: [' + selectedQuestionnaire.text.div.pre._text + ']';
    q.text = text;
    q.url = selectedQuestionnaire.url;
    q.title = selectedQuestionnaire.title;
    q.status = selectedQuestionnaire.status;
    q.experimental = selectedQuestionnaire.experimental;
    q.date = selectedQuestionnaire.date;
    q.publisher = selectedQuestionnaire.publisher;
    q.subjectType = selectedQuestionnaire.subjectType;
    console.log(q);
    return q;
  }

  // accessible for tests
  extractItem(obj: any): Item {
    let item: Item = new Item();
    item.linkId = obj.linkId;
    item.text = obj.text;
    item.type = obj.type;

    if (obj.option) {
      item.options = obj.option.map(o => o.valueString);
    }
    if (obj.item) {
      item.items = [];
      for (let i of obj.item) {
        item.items.push(this.extractItem(i));
      }
    }
    return item;
  }

}
