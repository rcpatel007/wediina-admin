import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { OrderComponent } from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DealerComponent } from './dealer/dealer.component';
import { GuestComponent } from './guest/guest.component';
import { ControlComponent } from './control/control.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services//login.service';

const appRoutes = [
  {path: '', component: LoginComponent},   
  {path: 'login', component: LoginComponent},   
  {path: 'header', component: HeaderComponent},   
  {path: 'dashboard', component: DashboardComponent},   
  {path: 'order', component: OrderComponent},   
  {path: 'inventory', component: InventoryComponent},   
  {path: 'dealer', component: DealerComponent},   
  {path: 'guest', component: GuestComponent},   
  {path: 'control', component: ControlComponent},   

];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    OrderComponent,
    InventoryComponent,
    DealerComponent,
    GuestComponent,
    ControlComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
