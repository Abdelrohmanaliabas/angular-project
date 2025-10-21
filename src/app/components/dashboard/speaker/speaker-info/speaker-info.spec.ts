import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerInfo } from './speaker-info';

describe('SpeakerInfo', () => {
  let component: SpeakerInfo;
  let fixture: ComponentFixture<SpeakerInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
