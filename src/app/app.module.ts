import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { NgFhirjsModule } from 'ng-fhirjs';
import { FHIR_HTTP_CONFIG } from 'ng-fhirjs';
import { FHIR_JS_CONFIG } from './settings/settings.component.spec';
import { CapabilityStatementComponent } from './capability-statement/capability-statement.component';
import { PatientsComponent } from './patients/patients.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { Questionnaire01Component } from './questionnaire01/questionnaire01.component';


const routes: Routes = [
    {
      path: '', component: HomeComponent
    },
    { path: 'login', component: LoginComponent
    },
    { path: 'patients', component: PatientsComponent
    },
    {
      path: 'form', component: FormComponent
    },
    {
      path: 'questionnaire01', component: Questionnaire01Component
    },
    {
      path: 'CapabilityStatement', component: CapabilityStatementComponent
    },
    {
      path: 'settings', component: SettingsComponent
    }

  ];


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    CapabilityStatementComponent,
    PatientsComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    FormComponent,
    Questionnaire01Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgFhirjsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [{ provide: FHIR_HTTP_CONFIG, useValue: FHIR_JS_CONFIG}, AuthService, TokenStorage ],
  bootstrap: [AppComponent]
})
export class AppModule { }
