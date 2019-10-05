import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuePage } from './venue.page';

describe('VenuePage', () => {
  let component: VenuePage;
  let fixture: ComponentFixture<VenuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
