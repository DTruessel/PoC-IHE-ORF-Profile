import { Injectable } from '@angular/core';
import { FhirJsHttpService } from 'ng-fhirjs';
import { QuestionnaireResponse } from '../models/questionnaire-response';
import { Item } from '../models/item';

@Injectable()
export class BundleService {

  obj: any;

  constructor(
    private fhirHttpService: FhirJsHttpService,
  ) { }

  convertToQuestionnaireResponse(questionnaire, submittedEvent): QuestionnaireResponse {

    let qr = this.extractQuestionnaireResponseHeader(questionnaire);
    qr.items = [];
    questionnaire.item.forEach(i => qr.items.push(this.extractItem(i)));
    return qr;
  }

  private extractQuestionnaireResponseHeader(payload): QuestionnaireResponse {
    let qr = new QuestionnaireResponse();
    qr.identifier = payload.identifier;
    qr.basedOn = '';
    qr.parent = payload.order.number;
    qr.questionnaire = payload.title;
    qr.status = payload.status;
    qr.context = '';
    qr.authored = payload.date;                   //Datum des Erstellens der QR nicht des Q
    qr.author = payload.orderer.dataenterer;
    qr.source = '';

    console.log(qr);
    return qr;
  }

  extractItem(obj: any): Item {
    let item: Item = new Item();
    item.linkId = obj.linkId;
    item.definition = obj.linkId;
    item.text = obj.text;
    item.subject = obj.subject;
    item.type = obj.type;
    //item.answer =;
    //item.answer.value[x]
    //item.answer.item
    //item.item

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

  /*  extractItemValue(obj: any): Item {
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
          item.items.push(this.extractItemValue(i));
        }
      }
      return item;
    }*/

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


  // bundle: IResource;

  // entry =


  // create bundle

  /** Create Objects */
  // interface Tag { term: string; schema: string; label: string }

  // interface Entry extends Minimal { resource: IResource; category?: Tag[] }

  // declare function http(requestObj: RequestObj): Promise<ResponseObj>;


  /** Create a new resource with a server assigned id */
  // 




  // interface RequestObj extends Minimal { method: "DELETE" | "GET" | "HEAD" | "JSONP" | "OPTIONS"; url: string, headers?: any, data?: any }
  // interface ResponseObj { status: number; headers?: any; config: any; data: IResource }
