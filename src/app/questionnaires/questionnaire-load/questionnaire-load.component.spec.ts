import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireLoadComponent } from './questionnaire-load.component';

describe('QuestionnaireLoadComponent', () => {
  let component: QuestionnaireLoadComponent;
  let fixture: ComponentFixture<QuestionnaireLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
