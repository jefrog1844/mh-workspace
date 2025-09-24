import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhStates } from './mh-states';

describe('MhStates', () => {
  let component: MhStates;
  let fixture: ComponentFixture<MhStates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MhStates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MhStates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
