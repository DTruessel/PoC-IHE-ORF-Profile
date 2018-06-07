import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CapabilityStatementComponent } from '../capability-statement/capability-statement.component';
import { HomeComponent } from '../home/home.component';
import { SettingsComponent } from '../settings/settings.component';
import { QuestionnairesListComponent } from '../questionnaires/questionnaires-list/questionnaires-list.component';
import { PageNotFoundComponent } from '../page-not-found.component';
import { PatientsListComponent } from '../patients/patients-list/patients-list.component';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { QuestionnaireFormComponent } from '../questionnaires/questionnaire-form/questionnaire-form.component';
import { MessagesComponent } from '../messages/messages.component';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';


const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
  },
  { // Liste der Questionnaires und Suchfelder
    path: 'questionnaires-list',
    component: QuestionnairesListComponent,
    data: {},
  },
  {
    path: 'questionnaire-form',
    component: QuestionnaireFormComponent,
  },
  {
    path: 'capabilityStatement',
    component: CapabilityStatementComponent
  },
  { // FHIR Testserver
    path: 'settings',
    component: SettingsComponent
  },
  { // FHIR Testserver
    path: 'messages',
    component: MessagesComponent
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
