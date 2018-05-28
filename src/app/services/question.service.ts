import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../questions/question-dropdown';
import { QuestionBase } from '../questions/question-base';
import { TextboxQuestion } from '../questions/question-textbox';
import { CheckboxQuestion } from '../questions/question-checkbox';
import { RadioButtonQuestion } from '../questions/question-radio-button';
import { DateQuestion } from '../questions/question-date';
import { TextareaQuestion } from '../questions/question-textarea';
import { QuestionGroup } from '../questions/question-group';
import { Questionnaire } from '../models/questionnaire';
import { QuestionDescription } from '../questions/question-description';
import { Item } from '../models/item';
import { ValueCodingQuestion } from '../questions/question-valueCoding';

// TODO TMP
const todoText = 'Freitext';


@Injectable()
export class QuestionService {

  getQuestions(q: Questionnaire): QuestionBase<any>[] {
    let res: QuestionBase<any>[] = [];
    this.pushQuestionnaireDescriptions(q, res);
    for (let i of q.item) {
      res.push(this.getQuestionForItem(i, 1));
    }
    return res;
  }

  // TODO TMP labels
  private pushQuestionnaireDescriptions(q, res) {
    let group = new QuestionGroup({ key: q.id, label: 'Questionnaire Kopfdaten' });
    group.nestingLevel = 0;

    group.children.push(new QuestionDescription({ label: 'URL', value: q.url }));
    group.children.push(new QuestionDescription({ label: 'Identifier', value: q.identifier }));
    group.children.push(new QuestionDescription({ label: 'Version', value: q.version }));
    group.children.push(new QuestionDescription({ label: 'Name', value: q.name }));
    group.children.push(new QuestionDescription({ label: 'Title', value: q.title }));
    group.children.push(new QuestionDescription({ label: 'Status', value: q.status }));
    group.children.push(new QuestionDescription({ label: 'Experimental', value: q.experimental }));
    group.children.push(new QuestionDescription({ label: 'Date', value: q.date }));
    group.children.push(new QuestionDescription({ label: 'Publisher', value: q.publisher }));
    group.children.push(new QuestionDescription({ label: 'Description', value: q.description }));
    group.children.push(new QuestionDescription({ label: 'Purpose', value: q.purpose }));
    group.children.push(new QuestionDescription({ label: 'ApprovalDate', value: q.approvalDate }));
    group.children.push(new QuestionDescription({ label: 'LastReviewDate', value: q.lastReviewDate }));
    group.children.push(new QuestionDescription({ label: 'EffectivePeriod', value: q.effectivePeriod }));
    group.children.push(new QuestionDescription({ label: 'UseContext', value: q.useContext }));
    group.children.push(new QuestionDescription({ label: 'Jurisdiction', value: q.jurisdiction }));
    group.children.push(new QuestionDescription({ label: 'Contact', value: q.contact }));
    group.children.push(new QuestionDescription({ label: 'Copyright', value: q.copyright }));
    group.children.push(new QuestionDescription({ label: 'Code', value: q.code }));
    group.children.push(new QuestionDescription({ label: 'ID', value: q.id }));
    group.children.push(new QuestionDescription({ label: 'Text', value: q.text }));
    group.children.push(new QuestionDescription({ label: 'Subject Type', value: q.subjectType }));
    res.push(group);
  }

  // accessible for tests
  getQuestionForItem(item: Item, nestingLevel: number): QuestionBase<any> {
    let widget: QuestionBase<any>;
    switch (item.type) {
      case 'group':
        let groupWidget: QuestionGroup = new QuestionGroup({
          key: item.linkId,
          label: item.text,
        });
        groupWidget.nestingLevel = nestingLevel;
        for (let i of item.item) {
          groupWidget.children.push(this.getQuestionForItem(i, nestingLevel + 1));
        }
        widget = groupWidget;
        break;
      case 'display':
        widget = new TextareaQuestion({
          key: item.linkId,
          label: item.text,
          rows: 1,
          span: 3,
        });
        break;
      case 'boolean':
        widget = new TextboxQuestion({
          key: item.linkId,
          label: item.text,
        });
        break;
      case 'decimal':
        widget = new TextboxQuestion({
          key: item.linkId,
          label: item.text,
        });
        break;
      case 'integer':
        widget = new TextboxQuestion({
          key: item.linkId,
          label: item.text,
        });
        break;
      case 'dateTime+':
        widget = new TextboxQuestion({
          key: item.linkId,
          label: item.text,
        });
        break;
      case 'string':
        widget = new TextboxQuestion({
          key: item.linkId,
          label: item.text,
        });
        break;
      case 'text':
        widget = new TextareaQuestion({
          key: item.linkId,
          label: item.text,
          rows: 6,
          span: 3,
        });
        break;
      case 'date':
        widget = new DateQuestion({
          key: item.linkId,
          label: item.text,
        });
        break;
      case 'choice':
        let selectOptions = [];
        for (let o of item.options) {
          selectOptions.push({ label: o, value: o });
        }
        if (selectOptions.length > 2) {
          widget = new DropdownQuestion({
            key: item.linkId,
            label: item.text,
            options: selectOptions,
          });
        } else {
          widget = new RadioButtonQuestion({
            key: item.linkId,
            label: item.text,
            options: selectOptions,
          });
        }
        break;
      case 'valueCoding':
        let options = [];
        for (let o of item.options) {
          options.push({ display: o });
          widget = new ValueCodingQuestion({
            key: item.linkId,
          });
        }
        break;
    }
    return widget;
  }
}