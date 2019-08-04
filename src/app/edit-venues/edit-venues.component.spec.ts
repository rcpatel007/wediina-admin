import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVenuesComponent } from './edit-venues.component';

describe('EditVenuesComponent', () => {
  let component: EditVenuesComponent;
  let fixture: ComponentFixture<EditVenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
