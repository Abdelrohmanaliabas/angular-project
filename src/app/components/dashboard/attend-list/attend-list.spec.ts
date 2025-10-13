import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendList } from './attend-list';

describe('AttendList', () => {
  let component: AttendList;
  let fixture: ComponentFixture<AttendList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
