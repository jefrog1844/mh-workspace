import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhInput } from './mh-input';

describe('MhInput', () => {
  let component: MhInput;
  let fixture: ComponentFixture<MhInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MhInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MhInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
