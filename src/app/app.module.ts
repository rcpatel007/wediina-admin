import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { OrderComponent } from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DealerComponent } from './dealer/dealer.component';
import { GuestComponent } from './guest/guest.component';
import { ControlComponent } from './control/control.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';

import { LoginService } from './services/login.service';
import { BrandService } from './services/brand.service';
import { AccountService } from './services/account.service';
import { CategoryService } from './services/category.service';
import { DealerService } from './services/dealer.service';
import { GuestService } from './services/guest.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { CityService } from './services/city.service';
import { NotificationService } from './services/notification.service';
import { Globals } from '../globals';
import { VieworderComponent } from './vieworder/vieworder.component';
import { EditorderComponent } from './editorder/editorder.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { NotificationComponent } from './notification/notification.component';
import { StockmanagementComponent } from './stockmanagement/stockmanagement.component';

const appRoutes = [
  {path: '', component: LoginComponent},   
  {path: 'login', component: LoginComponent},   
  {path: 'forgerPassword', component: ForgetpasswordComponent},   
  {path: 'header', component: HeaderComponent},   
  {path: 'dashboard', component: DashboardComponent},   
  {path: 'order', component: OrderComponent},   
  {path: 'addproduct', component: AddProductComponent},   
  {path: 'editproduct/:id', component: EditproductComponent},   
  {path: 'viewproduct/:id', component: ViewproductComponent},   
  {path: 'inventory', component: InventoryComponent},   
  {path: 'stock', component: StockmanagementComponent},   
  {path: 'dealer', component: DealerComponent},   
  {path: 'guest', component: GuestComponent},   
  {path: 'brand', component: BrandComponent},   
  {path: 'category', component: CategoryComponent},   
  {path: 'control', component: ControlComponent},   
  {path: 'notificaiton', component: NotificationComponent},   
  {path: 'vieworder/:id', component: VieworderComponent},   
  {path: 'editorder/:id', component: EditorderComponent},   
  

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
    LoginComponent,
    CategoryComponent,
    BrandComponent,
    VieworderComponent,
    EditorderComponent,
    AddProductComponent,
    EditproductComponent,
    ViewproductComponent,
    ForgetpasswordComponent,
    NotificationComponent,
    StockmanagementComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [CookieService,
              LoginService, 
              OrderService,
              AccountService,
              CategoryService,
              BrandService,
              DealerService,
              ProductService,
              GuestService,
              RoleService,
              UserService,
              CityService,
              NotificationService,
              Globals
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
