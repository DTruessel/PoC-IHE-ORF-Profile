import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  forms = [
    {value: 'form1', viewValue: 'Form 1'},
    {value: 'form2', viewValue: 'Form 2'},
    {value: 'form3', viewValue: 'Form 3'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
