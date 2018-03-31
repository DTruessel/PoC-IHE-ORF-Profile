import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpConfigComponent } from './http-config.component';

describe('HttpConfigComponent', () => {
  let component: HttpConfigComponent;
  let fixture: ComponentFixture<HttpConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
