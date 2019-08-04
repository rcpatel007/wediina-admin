import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueInquiryComponent } from './venue-inquiry.component';

describe('VenueInquiryComponent', () => {
  let component: VenueInquiryComponent;
  let fixture: ComponentFixture<VenueInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
