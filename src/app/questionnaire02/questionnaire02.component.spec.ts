import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Questionnaire02Component } from './questionnaire02.component';

describe('Questionnaire02Component', () => {
  let component: Questionnaire02Component;
  let fixture: ComponentFixture<Questionnaire02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questionnaire02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Questionnaire02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
