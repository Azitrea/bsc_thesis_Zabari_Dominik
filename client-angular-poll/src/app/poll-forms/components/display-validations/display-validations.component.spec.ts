import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayValidationsComponent } from './display-validations.component';

describe('DisplayValidationsComponent', () => {
  let component: DisplayValidationsComponent;
  let fixture: ComponentFixture<DisplayValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
