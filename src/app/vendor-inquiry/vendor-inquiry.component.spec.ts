import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInquiryComponent } from './vendor-inquiry.component';

describe('VendorInquiryComponent', () => {
  let component: VendorInquiryComponent;
  let fixture: ComponentFixture<VendorInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
