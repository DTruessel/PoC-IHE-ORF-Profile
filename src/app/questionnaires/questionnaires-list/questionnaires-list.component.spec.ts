import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesListComponent } from './questionnaires-list.component';

describe('QuestionnairesComponent', () => {
  let component: QuestionnairesListComponent;
  let fixture: ComponentFixture<QuestionnairesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnairesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
