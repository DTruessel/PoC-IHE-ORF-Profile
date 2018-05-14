import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { SessionService } from '../../services/session.service';
import { Item } from '../../models/item';
import { QuestionBase } from '../../questions/question-base';
import { ParserService } from '../../services/parser.service';
import { Questionnaire } from '../../models/questionnaire';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css'],

})
export class QuestionnaireFormComponent implements OnInit {
  questions: any[];
  questionnaire: Questionnaire;

  constructor(
    private questionService: QuestionService,
    private sessionService: SessionService,
    private parserService: ParserService
  ) {

    const rawQ = this.sessionService.selectedQuestionnaire;
    if (rawQ) {
      this.questionnaire = this.parserService.convertToQuestionnaire(rawQ);
      this.questions = this.questionService.getQuestions(this.questionnaire);
    } else {
      alert('!! NO QUESTIONNAIRE FOUND IN SESSION !!');
      // Navigation zur Suche ?! ev link zum wieder suchen
    }

  }

  ngOnInit() { }

}




