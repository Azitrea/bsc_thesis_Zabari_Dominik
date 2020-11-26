import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewControlOptionsComponent } from './new-control-options.component';

describe('NewControlOptionsComponent', () => {
  let component: NewControlOptionsComponent;
  let fixture: ComponentFixture<NewControlOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewControlOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewControlOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
