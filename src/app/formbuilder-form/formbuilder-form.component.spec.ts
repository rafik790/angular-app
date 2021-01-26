import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbuilderFormComponent } from './formbuilder-form.component';

describe('FormbuilderFormComponent', () => {
  let component: FormbuilderFormComponent;
  let fixture: ComponentFixture<FormbuilderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormbuilderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormbuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
