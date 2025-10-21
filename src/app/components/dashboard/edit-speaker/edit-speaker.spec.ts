import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeaker } from './edit-speaker';

describe('EditSpeaker', () => {
  let component: EditSpeaker;
  let fixture: ComponentFixture<EditSpeaker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpeaker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpeaker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
