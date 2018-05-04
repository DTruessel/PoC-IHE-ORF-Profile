import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  forms = [
    { value: 'form1', viewValue: 'Ebida Order Example' },
    { value: 'form2', viewValue: 'Lab Order Example' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
