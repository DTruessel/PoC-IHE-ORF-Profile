import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Questionnaire01Component } from './questionnaire01.component';

describe('Questionnaire01Component', () => {
  let component: Questionnaire01Component;
  let fixture: ComponentFixture<Questionnaire01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questionnaire01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Questionnaire01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
