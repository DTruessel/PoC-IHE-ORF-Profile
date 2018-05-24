import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { SessionService } from '../../services/session.service';
import { Item } from '../../models/item';
import { QuestionBase } from '../../questions/question-base';
import { ParserService } from '../../services/parser.service';
import { Questionnaire } from '../../models/questionnaire';
import { Router } from '@angular/router';
import { QuestionnaireResponse } from '../../models/questionnaire-response';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css'],

})
export class QuestionnaireFormComponent implements OnInit {
  questions: any[];
  questionnaire: Questionnaire;
  questionnaireResponse: QuestionnaireResponse;

  constructor(
    private questionService: QuestionService,
    private sessionService: SessionService,
    private parserService: ParserService,
    private router: Router,
  ) {

    const rawQ = this.sessionService.selectedQuestionnaire;
    if (rawQ) {
      this.questionnaire = this.parserService.convertToQuestionnaire(rawQ);
      this.questions = this.questionService.getQuestions(this.questionnaire);
    }
    else if (alert) {                                                                   // neu 18.05.2018
      alert('No Questionnaire found in Session');
      // Navigation zur Suche ?! ev link zum wieder suchen
      this.router.navigate(['/questionnaires-list']);                                     // neu 18.05.2018
    }

  }

  ngOnInit() { }

}



//submit form.value
//
