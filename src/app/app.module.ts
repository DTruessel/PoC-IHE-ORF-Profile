import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PatientsListComponent } from './patients/patients-list/patients-list.component';
import { SettingsComponent } from './settings/settings.component';
import { CapabilityStatementComponent } from './capability-statement/capability-statement.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { NgFhirjsModule } from 'ng-fhirjs';
import { FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { FHIR_JS_CONFIG } from './settings/settings.component.spec';
import { SessionService } from './services/session.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionnairesListComponent } from './questionnaires/questionnaires-list/questionnaires-list.component';
import { QuestionService } from './services/question.service';
import { ParserService } from './services/parser.service';
import { QuestionnaireFormComponent } from './questionnaires/questionnaire-form/questionnaire-form.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { QuestionControlService } from './services/question-control.service';
import { BundleService } from './services/bundle.service';
import { PrefillService } from './services/prefill.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientsListComponent,
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
    HttpClientModule,
    NgFhirjsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],

  providers: [
    { provide: FHIR_HTTP_CONFIG, useValue: FHIR_JS_CONFIG },
    SessionService,
    QuestionService,
    ParserService,
    QuestionControlService,
    BundleService,
    PrefillService,
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }
