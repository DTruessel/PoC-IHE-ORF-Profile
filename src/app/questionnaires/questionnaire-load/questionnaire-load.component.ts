import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { SessionService } from '../../services/session.service';
import { Item } from '../../models/item';
import { QuestionBase } from '../../questions/question-base';
import { ParserService } from '../../services/parser.service';

@Component({
  selector: 'app-questionnaire-load',
  templateUrl: './questionnaire-load.component.html',
  styleUrls: ['./questionnaire-load.component.css'],
  providers: [
    QuestionService,
    SessionService,
    ParserService
  ]
})
export class QuestionnaireLoadComponent implements OnInit {

  questions: any[];
  obj: any;
  questionnaireObject: any;

  @Input() selectedQuestionnaire = this.sessionService.selectedQuestionnaire;

  constructor(
    private questionService: QuestionService,
    private sessionService: SessionService,
    private parserService: ParserService
  ) {
    // this.loadItems();
    // this.loadQuestionnaire();

  }

  ngOnInit() {
    this.sessionService.setSelectedQuestionnaire(this.questionnaireObject);
  }

  loadItems(): any {
    // let jStr = this.parserService.parseXmlToJson(xml3.data3); // nicht nötig
    // obj: any = selectedQuestionnaire;
    let items: Item[] = [];
    for (let o of this.selectedQuestionnaire.item) {
      let i = this.parserService.extractItem(o);
      items.push(i);
    }
    this.questions = [];
    for (let i of items) {
      let question: QuestionBase<any> = this.questionService.getQuestionForItem(i, 0);
      this.questions.push(question);
    }
  }

  /*loadItems(): any {
  
    let items: Item[] = [];
    for (let o of this.sessionService.selectedQuestionnaire.item) {
      let i = this.parserService.extractItem(o);
      items.push(i);
    }
    this.questions = [];
    for (let i of items) {
      let question: QuestionBase<any> = this.questionService.getQuestionForItem(i, 0);
      this.questions.push(question);
    }
  }*/

  loadQuestionnaire() {
    let questionnaire = this.sessionService.selectedQuestionnaire;
    this.questions = this.questionService.getQuestions(this.sessionService.selectedQuestionnaire);
  }
}


