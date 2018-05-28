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

  @Input() questions: QuestionBase<any>[] = [];
  @Input() selectedQuestionnaire = this.sessionService.selectedQuestionnaire;

  items = [];

  constructor(
    private fhirHttpService: FhirJsHttpService,
    private sessionService: SessionService,
    private questionService: QuestionService
  ) { }

  convertToQuestionnaireResponse(selectedQuestionnaire, submittedEvent): QuestionnaireResponse {
    let qr = this.extractQuestionnaireResponseHeader(selectedQuestionnaire);
    qr.item = [];
    this.items.forEach(i => qr.item.push(this.extractItem(i)));
    return qr;
  }

  private extractQuestionnaireResponseHeader(selectedQuestionnaire: Questionnaire): QuestionnaireResponse {
    let qr = new QuestionnaireResponse();
    qr.identifier = selectedQuestionnaire.identifier;
    qr.basedOn = selectedQuestionnaire.title;
    qr.parent = selectedQuestionnaire.name;
    qr.questionnaire = selectedQuestionnaire.url;
    qr.status = selectedQuestionnaire.status;
    qr.subject = selectedQuestionnaire.subjectType;
    qr.context = selectedQuestionnaire.useContext;
    qr.authored = selectedQuestionnaire.date;                   //Datum des Erstellens der QR nicht des Q
    qr.author = '';
    qr.source = '';

    console.log(qr);
    return qr;
  }

  extractItem(items): Item {
    let item: Item = new Item();
    item.linkId = this.selectedQuestionnaire.item.linkId;
    item.definition = this.selectedQuestionnaire.item.definition;
    item.code = this.selectedQuestionnaire.item.code;
    item.prefix = this.selectedQuestionnaire.item.prefix;
    item.text = this.selectedQuestionnaire.item.text;
    item.type = this.selectedQuestionnaire.item.type;
    item.answer = this.selectedQuestionnaire.item.text;
    item.answer = this.selectedQuestionnaire.item.definition;


    if (item.option) {
      item.options = item.option.map(o => o.value);
    }
    if (item.item) {
      item.item = [];
      for (let i of item.item) {
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
