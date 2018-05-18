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

// TODO TMP
const todoText = 'Freitext';


@Injectable()
export class QuestionService {

  getQuestions(q: Questionnaire): QuestionBase<any>[] {
    let res: QuestionBase<any>[] = [];
    this.pushQuestionnaireDescriptions(q, res);
    for (let i of q.items) {
      res.push(this.getQuestionForItem(i, 1));
    }
    return res;
  }

  // TODO TMP labels
  private pushQuestionnaireDescriptions(q, res) {
    let group = new QuestionGroup({ key: q.id, label: 'Questionnaire Kopfdaten' });
    group.nestingLevel = 0;
    group.children.push(new QuestionDescription({ label: 'ID', value: q.id }));
    group.children.push(new QuestionDescription({ label: 'Text', value: q.text }));
    group.children.push(new QuestionDescription({ label: 'URL', value: q.url }));
    group.children.push(new QuestionDescription({ label: 'Title', value: q.title }));
    group.children.push(new QuestionDescription({ label: 'Status', value: q.status }));
    group.children.push(new QuestionDescription({ label: 'Experimental', value: q.experimental }));
    group.children.push(new QuestionDescription({ label: 'Date', value: q.date }));
    group.children.push(new QuestionDescription({ label: 'Publisher', value: q.publisher }));
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
        for (let i of item.items) {
          groupWidget.children.push(this.getQuestionForItem(i, nestingLevel + 1));
        }
        widget = groupWidget;
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
          rows: 12,
          span: 3,
        });
        // TODO TMP!
        if (item.linkId === 'command.examiniation.text') {
          widget.value = todoText;
        }
        break;
      case 'boolean':
        widget = new CheckboxQuestion({
          key: item.linkId,
          label: item.text,
          options: [
            { label: 'auswählen', value: true, },
          ]
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
    }
    return widget;
  }
}

