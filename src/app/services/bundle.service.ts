import { Injectable, Input } from '@angular/core';
import { FhirJsHttpService } from 'ng-fhirjs';
import { QuestionnaireResponse } from '../models/questionnaire-response';
import { Item } from '../models/item';
import { Questionnaire } from '../models/questionnaire';
import { SessionService } from './session.service';
import { FormGroup } from '@angular/forms';
import { QuestionService } from './question.service';
import { QuestionBase } from '../questions/question-base';

@Injectable()
export class BundleService {

  dateObj = new Date()

  constructor(
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
    private questionService: QuestionService
  ) { }

  copyQuestionnaire(questionnaire, submittedEvent): QuestionnaireResponse {
    let qr = this.copyQuestionnaireHeader(questionnaire);
    qr.item = [];
    questionnaire.item.forEach(i => qr.item.push(this.copyItem(questionnaire, submittedEvent))); //questionnaire.item ist ein Array
    console.log(qr)

    return qr;
  }

  copyQuestionnaireHeader(questionnaire): QuestionnaireResponse {
    let qr = new QuestionnaireResponse();
    qr.identifier = questionnaire.identifier;
    qr.basedOn = 'The order, proposal or plan that is fulfilled in whole or in part by this QuestionnaireResponse.';
    qr.parent = 'A procedure or observation that this questionnaire was performed as part of the execution of.';
    qr.questionnaire = questionnaire.title;
    qr.status = 'in-progress | completed | amended | entered-in-error | stopped';
    qr.subject = 'The subject of the questionnaire response. This could be a patient, organization, practitioner, device, etc.';
    qr.context = 'The encounter or episode of care with primary association to the questionnaire response.';
    qr.authored = this.dateObj;
    qr.author = 'Person who received the answers to the questions in the QuestionnaireResponse and recorded them in the system.';
    qr.source = 'The person who answered the questions about the subject.';

    return qr;
  }

  copyItem(questionnaire, submittedEvent): Item {

    let qItems = [];
    let qrItems = [];
    let item: Item = new Item();

    //Array mit den Values von submittedEvent: Muss in item.answer
    let submittedEventValues = Object.values(submittedEvent); //liefert ein Array, dessen Elemente Strings sind und die aufzählbaren Eigenschaften des Objekts respräsentieren.
    //console.log('BundleService submittedEventValues:' + submittedEventValues)

    //Array mit den Keys von submittedEvent: muss mit Item.linkId übereinstimmen
    let submittedEventKeys = Object.keys(submittedEvent);
    //console.log('BundleService submittedEventKeys:' + submittedEventKeys)

    for (let keyLinkId in submittedEvent) {
      //console.log('BundleService submittedEvent:' + keyLinkId, submittedEvent[keyLinkId]);
      item.linkId = keyLinkId;
    }
    //item.linkId = questionnaire.item.linkId;
    item.definition = questionnaire.definition;
    item.code = questionnaire.code;
    item.prefix = questionnaire.prefix;
    item.text = questionnaire.text;
    item.type = questionnaire.type;
    item.answer = submittedEventValues;

    questionnaire.item.forEach(i => qrItems.push(i));

    if (item.option) { //choice
      item.options = item.option.map(o => o.value);
    }
    if (item.item) { //gruppe
      item.item = [];
      for (let i of item.item) {
        item.item.push(this.copyItem(questionnaire, submittedEvent));
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

    /*for (let item in qrItems) {
      qrItems.push(item)
      console.log('qrItems:' + qrItems)
    }*/

    //questionnaire.item.forEach(i => qrItems.push(item));

    //Array mit den QItems zum Kopieren in QRItems: 
    //item.forEach(i => qrItems.push(i))
    //console.log('BundleService qitems:' + qitems);

    //Array mit den Keys von submittedEvent: muss mit Item.linkId übereinstimmen
    //let submittedEventKeys = Object.keys(submittedEvent);
    //console.log('BundleService submittedEventKeys:' + submittedEventKeys)

    //item.answer = submittedEventKeys[key]

    //for (let keyValuePair in submittedEvent) {
    //console.log('BundleService submittedEvent:' + keyValuePair, submittedEvent[keyValuePair]);
    //}

    //submittedEventKeys.forEach(i => submittedEventValues.push(i))
    //console.log('qrItemanswers: ' + submittedEventValues)

    ///item.forEach(qrItems.push(this.copyItem(questionnaire, submittedEvent))); //questionnaire.item ist ein Array

    //questionnaire.item.forEach(i => qrItems.push(i));

    //question.service.ts: key: item.linkId,

    //questionnaire.item.forEach(i => qrItemanswers.push(submittedEvent['item.linkId']));
  // bundle: IResource;

  // entry =


  // create bundle

  /** Create a new resource with a server assigned id
   *  create(entry: Entry): Promise<ResponseObj>;
   * fhirHttpService.create(entry).then(response => {
   */


  /** Create Objects */
  // interface Tag { term: string; schema: string; label: string }

  // interface Entry extends Minimal { resource: IResource; category?: Tag[] }

  // declare function http(requestObj: RequestObj): Promise<ResponseObj>;


  /** Create a new resource with a server assigned id */
  // 




  // interface RequestObj extends Minimal { method: "DELETE" | "GET" | "HEAD" | "JSONP" | "OPTIONS"; url: string, headers?: any, data?: any }
  // interface ResponseObj { status: number; headers?: any; config: any; data: IResource }
