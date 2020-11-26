import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAnswerViewComponent } from './poll-answer-view.component';

describe('PollAnswerViewComponent', () => {
  let component: PollAnswerViewComponent;
  let fixture: ComponentFixture<PollAnswerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollAnswerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAnswerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
