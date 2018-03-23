import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  forms = [
    {value: 'form1', viewValue: 'Questionnaire 01'},
    {value: 'form2', viewValue: 'Questionnaire 02'},
    {value: 'form3', viewValue: 'Questionnaire 03'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
