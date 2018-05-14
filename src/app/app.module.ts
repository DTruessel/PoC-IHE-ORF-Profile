import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/app-routing.module';

import { HomeComponent } from './home/home.component';
import { PatientsListComponent } from './patients/patients-list/patients-list.component';
import { PatientsComponent } from './patients/patients/patients.component';
import { PatientDetailComponent } from './patients/patient-detail/patient-detail.component';

import { SettingsComponent } from './settings/settings.component';
import { CapabilityStatementComponent } from './capability-statement/capability-statement.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { NgFhirjsModule } from 'ng-fhirjs';
import { FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { FHIR_JS_CONFIG } from './settings/settings.component.spec';
import { MessageService } from './message.service';
import { PatientService } from './patients/patient.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { SessionService } from './services/session.service';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionnairesListComponent } from './questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionService } from './services/question.service';
import { ParserService } from './services/parser.service';
import { QuestionnaireFormComponent } from './questionnaires/questionnaire-form/questionnaire-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientsListComponent,
    PatientsComponent,
    PatientDetailComponent,
    SettingsComponent,
    CapabilityStatementComponent,
    PageNotFoundComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    QuestionnairesListComponent,
    QuestionnaireFormComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgFhirjsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],

  providers: [
    { provide: FHIR_HTTP_CONFIG, useValue: FHIR_JS_CONFIG },
    AppRoutingModule, MessageService, PatientService,
    SelectivePreloadingStrategy,
    SessionService,
    QuestionService,
    ParserService
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }
