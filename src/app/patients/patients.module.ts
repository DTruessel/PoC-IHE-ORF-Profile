import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientService } from '../services/patient.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PatientRoutingModule
    ],
    declarations: [
        PatientsListComponent,
        PatientsComponent
    ],
    providers: [PatientService]
})
export class PatientsModule { }
