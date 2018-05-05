import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Patient[];
  messages: string[] = [];

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(patients => this.patients = patients);
  }

  add(message: string) {
    this.messages.push(message);
  }

}
