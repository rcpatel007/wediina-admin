import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'angular2-cookie/services/cookies.service';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { Ng2CompleterModule } from "ng2-completer";
// import { Ng2SimpleAutocomplete } from 'ng2-simple-autocomplete';  

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { LoginService } from './services/login.service';
import { VenueService } from './services/venue.service';
import { VendorService } from './services/vendor.service';
import { CustomerService } from './services/customer.service';
import { ControlService } from './services/control.service';

import { Globals } from '../globals';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { VenueComponent } from './venue/venue.component';
import { VenueCategoryComponent } from './venue-category/venue-category.component';
import { VendorCategoryComponent } from './vendor-category/vendor-category.component';
import { VenueInquiryComponent } from './venue-inquiry/venue-inquiry.component';
import { VendorInquiryComponent } from './vendor-inquiry/vendor-inquiry.component';
import { AddVenueComponent } from './add-venue/add-venue.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { CustomerComponent } from './customer/customer.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ControlComponent } from './control/control.component';
import { EditVenuesComponent } from './edit-venues/edit-venues.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';


const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgerPassword', component: ForgetpasswordComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'VenueCategory', component: VenueCategoryComponent },
  { path: 'VendorCategory', component: VendorCategoryComponent },
  { path: 'venues', component: VenueComponent },
  { path: 'Vendors', component: VendorsComponent },
  { path: 'AddVenue', component: AddVenueComponent },
  { path: 'Addvendor', component: AddVendorComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'venuedetail', component: CustomerComponent },
  { path: 'venuesEdit/:id', component: EditVenuesComponent },
  { path: 'vendorsEdit/:id', component: EditVendorComponent },
  { path: 'Control', component: ControlComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    ForgetpasswordComponent,
    VenueComponent,
    VenueCategoryComponent,
    VendorCategoryComponent,
    VenueInquiryComponent,
    VendorInquiryComponent,
    AddVenueComponent,
    AddVendorComponent,
    CustomerComponent,
    VendorsComponent,
    ControlComponent,
    EditVenuesComponent,
    EditVendorComponent,
    // Ng2SimpleAutocomplete,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    // Ng2CompleterModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [CookieService,
    LoginService,
    VenueService,
    VendorService,
    CustomerService,
    ControlService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
