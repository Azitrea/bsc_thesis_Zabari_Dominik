import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputDynamicComponent } from './date-input-dynamic.component';

describe('DateInputDynamicComponent', () => {
  let component: DateInputDynamicComponent;
  let fixture: ComponentFixture<DateInputDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInputDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
