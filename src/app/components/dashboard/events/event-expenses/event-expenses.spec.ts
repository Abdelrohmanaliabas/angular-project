import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventExpenses } from './event-expenses';

describe('EventExpenses', () => {
  let component: EventExpenses;
  let fixture: ComponentFixture<EventExpenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventExpenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventExpenses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
