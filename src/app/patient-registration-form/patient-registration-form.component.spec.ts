import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationFormComponent } from './patient-registration-form.component';

describe('PatientRegistrationFormComponent', () => {
  let component: PatientRegistrationFormComponent;
  let fixture: ComponentFixture<PatientRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
