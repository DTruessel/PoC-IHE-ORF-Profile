import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapabilityStatementComponent } from '../capability-statement/capability-statement.component';
import { HomeComponent } from '../home/home.component';
import { SettingsComponent } from '../settings/settings.component';
import { QuestionnairesComponent } from '../questionnaires/questionnaires.component';
import { PageNotFoundComponent } from '../page-not-found.component';
import { PatientsListComponent } from '../patients/patients-list/patients-list.component';
import { PatientDetailComponent } from '../patients/patient-detail/patient-detail.component';
import { PatientsComponent } from '../patients/patients/patients.component';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';


const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'patients-list',
    component: PatientsListComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'patient-detail/:id',
    component: PatientDetailComponent,
  },
  { // Liste der Questionnaires und Suchfelder
    path: 'questionnaires',
    component: QuestionnairesComponent,
    data: {},
  },
  /*{
    path: 'dynamic-form',
    component: DynamicFormComponent,
  },*/
  {
    path: 'capabilityStatement',
    component: CapabilityStatementComponent
  },
  { // FHIR Testserver
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
