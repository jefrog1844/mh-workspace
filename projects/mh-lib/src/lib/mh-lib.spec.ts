import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MhLib } from './mh-lib';

describe('MhLib', () => {
  let component: MhLib;
  let fixture: ComponentFixture<MhLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MhLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MhLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
