import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormModalBaseComponent } from './new-form-modal-base.component';

describe('NewFormModalBaseComponent', () => {
  let component: NewFormModalBaseComponent;
  let fixture: ComponentFixture<NewFormModalBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFormModalBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormModalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
