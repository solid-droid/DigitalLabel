import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUIComponent } from './employee-ui.component';

describe('EmployeeUIComponent', () => {
  let component: EmployeeUIComponent;
  let fixture: ComponentFixture<EmployeeUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
