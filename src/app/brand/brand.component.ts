import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  socket;

  user_id:String;
  auth: any;
  brand: Brand[];
  id: String;
  name: String;
  slang: String;

  // user
  b_add: boolean;
  b_edit: boolean;
  b_view: boolean;
  b_delete: boolean;

  constructor(private brandService: BrandService,
    private loginservice: LoginService,
    private router: Router,
    private userservice: UserService,
    private globals: Globals
  ) { this.socket = io('https://jasmatech-backend-api.herokuapp.com'); }



  ngOnInit() {
    if (this.loginservice.token == null) {
      this.router.navigate(["/login"]);
    }

    this.getuser(this.user_id);
    // this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.getBrand();

  }



  /* brand add*/
  addBrand() {
    let addbrand = {
      name: this.name,
    }

    this.brandService.addBrand(addbrand)
      .subscribe(() => {

        this.socket.emit('brand-saved', { data: addbrand });

        // this.closeBtn.nativeElement.click();
        // console.log(addbrand);
        this.getBrand();

      });
  }
  /*get brand by id */
  getBrandById(id) {
    this.brandService.getBrandById(id)
      .subscribe(data => {
        this.name = data.name;
        this.id = data._id;
        // this.slang =data[0].slang;
        // console.log(data);
      });


  }
  /* Update Brand Name*/
  editBrand() {
    let brand = {
      _id: this.id,
      name: this.name,
      // slang:this.slang      
    }
    this.brandService.editBrand(brand)
      .subscribe(() => {
        console.log(brand);
        // this.editcloseBtn.nativeElement.click();
        this.getBrand();
      });
  }


  /*display brand*/
  getBrand() {
    this.brandService.getBrand()
      .subscribe(Brand => {
        this.brand = Brand;

      });
  }



  /*delete brand */
  ConfirmDelete(id) {

    var x = confirm("Are you sure you want to delete?" + id);
    if (x) {
      console.log(this.auth);

      return this.deleteBrand(id);
    }

    else
      return false;
  }


  deleteBrand(id) {
    this.brandService.deleteBrand(id)
      .subscribe(result => {
        console.log(result);
        this.getBrand();
      });
  }


  getuser(user_id) {
    let id = environment.user_id
console.log('user id  '+id);

    this.userservice.getUserById(id)
      .subscribe((data) => {
        //  console.log(account);
        this.b_add = data.brand.add;
        this.b_edit = data.brand.edit;
        this.b_view = data.brand.view;
        this.b_delete = data.brand.delete;
   console.log(data);

      });
  }
}
