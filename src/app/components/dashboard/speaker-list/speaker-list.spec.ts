import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerList } from './speaker-list';

describe('SpeakerList', () => {
  let component: SpeakerList;
  let fixture: ComponentFixture<SpeakerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
