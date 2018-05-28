import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Questionnaire } from '../models/questionnaire';

@Injectable()
export class ParserService {

  obj: any;

  constructor() { }

  convertToQuestionnaire(obj: any): Questionnaire {
    let q = this.extractQuestionnaireHeader(obj);
    q.item = [];
    obj.item.forEach(i => q.item.push(this.extractItem(i)));
    return q;
  }

  private extractQuestionnaireHeader(selectedQuestionnaire: any): Questionnaire {
    let q = new Questionnaire();
    // q.id = selectedQuestionnaire.id;
    q.url = selectedQuestionnaire.url;
    q.identifier = selectedQuestionnaire.identifier;
    q.version = selectedQuestionnaire.version;
    q.name = selectedQuestionnaire.name;
    q.title = selectedQuestionnaire.title;
    q.status = selectedQuestionnaire.status;
    q.experimental = selectedQuestionnaire.experimental;
    q.date = selectedQuestionnaire.date;
    q.publisher = selectedQuestionnaire.publisher;
    q.description = selectedQuestionnaire.description;
    q.purpose = selectedQuestionnaire.purpose;
    q.approvalDate = selectedQuestionnaire.approvalDate;
    q.lastReviewDate = selectedQuestionnaire.lastReviewDate;
    q.effectivePeriod = selectedQuestionnaire.effectivePeriod;
    q.useContext = selectedQuestionnaire.useContext;
    q.jurisdiction = selectedQuestionnaire.jurisdiction;
    q.contact = selectedQuestionnaire.contact;
    q.copyright = selectedQuestionnaire.copyright;
    q.code = selectedQuestionnaire.code;
    q.subjectType = selectedQuestionnaire.subjectType;
    console.log(q);
    return q;
  }

  // accessible for tests
  extractItem(obj: any): Item {
    let item: Item = new Item();
    item.linkId = obj.linkId;
    item.definition = obj.definition;
    item.code = obj.code;
    item.prefix = obj.prefix;
    item.text = obj.text;
    item.type = obj.type;

    if (obj.option) {
      item.options = obj.option.map(o => o.valueString);
    }
    if (obj.item) {
      item.item = [];
      for (let i of obj.item) {
        item.item.push(this.extractItem(i));
      }
    }
    return item;
  }

  extractOptions(item: Item): any[] {
    const selectOptions = [];
    if (item.options) {
      for (const o of item.options) {
        selectOptions.push({ label: o, value: o });                     //20.05.2018 label: o.label, value: o.label ersetzt
      }
    } else {
      selectOptions.push({ label: 'NO OPTIONS FOUND', value: null });
      console.log('choice item without options' + JSON.stringify(item));
    }
    return selectOptions;
  }
}
