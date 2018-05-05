import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PatientService } from './patient.service';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientsComponent } from './patients/patients.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PatientRoutingModule
    ],
    declarations: [
        PatientsListComponent,
        PatientDetailComponent,
        PatientsComponent
    ],
    providers: [PatientService]
})
export class PatientsModule { }
