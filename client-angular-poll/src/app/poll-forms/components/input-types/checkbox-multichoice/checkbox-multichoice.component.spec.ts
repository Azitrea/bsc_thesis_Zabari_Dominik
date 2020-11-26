import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxMultichoiceComponent } from './checkbox-multichoice.component';

describe('CheckboxMultichoiceComponent', () => {
  let component: CheckboxMultichoiceComponent;
  let fixture: ComponentFixture<CheckboxMultichoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxMultichoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxMultichoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
