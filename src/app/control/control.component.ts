import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

import { CityService } from '../services/city.service';
import { City } from '../model/City';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { RoleService } from '../services/role.service';
import { Role } from '../model/Role';
import { DealertypeService } from '../services/dealertype.service';
import { Dealertype } from '../model/Dealertype';

import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { Order } from '../model/Order';

declare var $: any;

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  @ViewChild('add_user') add_user: ElementRef;

  id: String;
  cities: any = [];
  city: City[];
  city_name: any;
  state:String;
  user: User[];
  dealertype: Dealertype[];
  role: Role[];
  final_city = new Array();
  name: String;
  mobile: String;
  email: String;
  u_name: String;
  u_mobile: String;
  u_email: String;
  usertype: String;
  product: JSON;
  d_type: string;
  roletype: String;
  addroletype:String;
  getrole: String;
  role_disc: String;  
  disc: String;
  discount: String;
  t_id: String;
  r_id: String;
  type: String;
  accounttype:String;
  rolevalue: Boolean = false;
  userrolevalue: Boolean = false;
  
  // user

  a_o_add: boolean = false;
  a_o_edit: boolean = false;
  a_o_view: boolean = false;
  a_o_delete: boolean = false;

  a_d_add: boolean = false;
  a_d_edit: boolean = false;
  a_d_view: boolean = false;
  a_d_delete: boolean = false;

  a_i_add: boolean = false;
  a_i_edit: boolean = false;
  a_i_view: boolean = false;
  a_i_delete: boolean = false;

  a_g_add: boolean = false;
  a_g_edit: boolean = false;
  a_g_view: boolean = false;
  a_g_delete: boolean = false;


  a_b_add: boolean = false;
  a_b_edit: boolean = false;
  a_b_view: boolean = false;
  a_b_delete: boolean = false;

  a_c_add: boolean = false;
  a_c_edit: boolean = false;
  a_c_view: boolean = false;
  a_c_delete: boolean = false;


  // edit
  o_add: boolean = false;
  o_edit: boolean = false;
  o_view: boolean = false;
  o_delete: boolean = false;

  d_add: boolean = false;
  d_edit: boolean = false;
  d_view: boolean = false;
  d_delete: boolean = false;

  i_add: boolean = false;
  i_edit: boolean = false;
  i_view: boolean = false;
  i_delete: boolean = false;

  g_add: boolean = false;
  g_edit: boolean = false;
  g_view: boolean = false;
  g_delete: boolean = false;


  b_add: boolean = false;
  b_edit: boolean = false;
  b_view: boolean = false;
  b_delete: boolean = false;

  c_add: boolean = false;
  c_edit: boolean = false;
  c_view: boolean = false;
  c_delete: boolean = false;

  // role add
  r_o_add: boolean = false;
  r_o_edit: boolean = false;
  r_o_view: boolean = false;
  r_o_delete: boolean = false;

  r_d_add: boolean = false;
  r_d_edit: boolean = false;
  r_d_view: boolean = false;
  r_d_delete: boolean = false;

  r_i_add: boolean = false;
  r_i_edit: boolean = false;
  r_i_view: boolean = false;
  r_i_delete: boolean = false;

  r_g_add: boolean = false;
  r_g_edit: boolean = false;
  r_g_view: boolean = false;
  r_g_delete: boolean = false;


  r_b_add: boolean = false;
  r_b_edit: boolean = false;
  r_b_view: boolean = false;
  r_b_delete: boolean = false;

  r_c_add: boolean = false;
  r_c_edit: boolean = false;
  r_c_view: boolean = false;
  r_c_delete: boolean = false;

  // role edit
  e_o_add: boolean = false;
  e_o_edit: boolean = false;
  e_o_view: boolean = false;
  e_o_delete: boolean = false;

  e_d_add: boolean = false;
  e_d_edit: boolean = false;
  e_d_view: boolean = false;
  e_d_delete: boolean = false;

  e_i_add: boolean = false;
  e_i_edit: boolean = false;
  e_i_view: boolean = false;
  e_i_delete: boolean = false;

  e_g_add: boolean = false;
  e_g_edit: boolean = false;
  e_g_view: boolean = false;
  e_g_delete: boolean = false;


  e_b_add: boolean = false;
  e_b_edit: boolean = false;
  e_b_view: boolean = false;
  e_b_delete: boolean = false;

  e_c_add: boolean = false;
  e_c_edit: boolean = false;
  e_c_view: boolean = false;
  e_c_delete: boolean = false;


  constructor(private router: Router,
    private cityservice: CityService,
    private userservice: UserService,
    private roleservice: RoleService,
    private loginservice: LoginService,
    private dealertypeservice: DealertypeService
  ) { }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);

      // this.getcity();
    }
    this.getcity();
    this.viewUser();
    this.getRole();
    this.getType();



    $("script[src='assets/css/themes/collapsible-menu/materialize.css']").remove();
    $("script[src='assets/js/materialize.min.js']").remove();
    $("script[src='assets/js/scripts/advanced-ui-modals.js']").remove();

    var dynamicScripts = [
      "assets/css/themes/collapsible-menu/materialize.css",
      "assets/js/materialize.min.js",
      "assets/js/scripts/advanced-ui-modals.js",
    ];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }



  }

  /*display city*/
  getcity() {
    this.cityservice.getcity()
      .subscribe(data => {
        this.city = data;
        // for (let i = 0; i < data.length; i++) {
        //   this.city += data[i].city + ', ';
        // }
        console.log(this.city);
      });
  }
  // add  city 
  addCity() {
  
      let cityObj = {
        state:this.state,
        city:this.city_name
  
      }

      console.log(cityObj);
      this.cityservice.addcity(cityObj)
        .subscribe((res) => {
          this.getcity();

        });
    
  }
  viewUser() {
    this.userservice.getUser()
      .subscribe((data) => {
        //  console.log(account);
        this.user = data;
        // console.log(this.user);
      });
  }
  roleOff() {
    this.rolevalue = false;
  }
  addUser() {

      let add_user = {
        name: this.u_name,
        email: this.u_email,
        mobile: this.u_mobile,
        role: this.addroletype,
        order: {
          view: this.a_o_view,
          edit: this.a_o_edit,
          add: this.a_o_add,
          delete: this.a_o_delete
        },
        dealer: {
          view: this.a_d_view,
          edit: this.a_d_edit,
          add: this.a_d_add,
          delete: this.a_d_delete
        },

        brand: {
          view: this.a_b_view,
          edit: this.a_b_edit,
          add: this.a_b_add,
          delete: this.a_b_delete
        },
        product: {
          view: this.a_i_view,
          edit: this.a_i_edit,
          add: this.a_i_add,
          delete: this.a_i_delete
        },
        category: {
          view: this.a_c_view,
          edit: this.a_c_edit,
          add: this.a_c_add,
          delete: this.a_c_delete
        }
      }
      console.log(add_user);
      this.userservice.addUser(add_user)
        .subscribe((res) => {
          console.log(res);
          // console.log(this.viewUser);
          this.viewUser();

          this.name = "";
          this.email = "";
          this.mobile = "";
          this.role = null;
        });
    
  }
  /*get user by id */
  getuserById(id) {
    this.o_add = false;
    this.o_edit = false;
    this.o_view = false;
    this.o_delete = false;

    this.i_add = false;
    this.i_edit = false;
    this.i_view = false;
    this.i_delete = false;

    this.b_add = false;
    this.b_edit = false;
    this.b_view = false;
    this.b_delete = false;

    this.d_add = null;
    this.d_edit = null;
    this.d_view = null;
    this.d_delete = null;


    this.c_add = null;
    this.c_edit = null;
    this.c_view = null;
    this.c_delete = null;


    this.userservice.getUserById(id)
      .subscribe(data => {
        console.log("hello" + data);
        this.id = data._id;
        this.name = data.name;
        this.email = data.email;
        this.mobile = data.mobile;
        this.getrole = data.role;
        console.log(data);

        this.o_add = data.order.add;
        this.o_edit = data.order.edit;
        this.o_view = data.order.view;
        this.o_delete = data.order.delete;

        this.i_add = data.product.add;
        this.i_edit = data.product.edit;
        this.i_view = data.product.view;
        this.i_delete = data.product.delete;

        this.b_add = data.brand.add;
        this.b_edit = data.brand.edit;
        this.b_view = data.brand.view;
        this.b_delete = data.brand.delete;

        this.d_add = data.dealer.add;
        this.d_edit = data.dealer.edit;
        this.d_view = data.dealer.view;
        this.d_delete = data.dealer.delete;


        this.c_add = data.category.add;
        this.c_edit = data.category.edit;
        this.c_view = data.category.view;
        this.c_delete = data.category.delete;

      });


  }

  editUser() {
    let id = this.id;
   
      let updateuser = {
        _id: this.id,
        name: this.name,
        email: this.email,
        mobile: this.mobile,
        role: this.roletype,
        order: {
          view: this.o_view,
          edit: this.o_edit,
          add: this.o_add,
          delete: this.o_delete
        },
        dealer: {
          view: this.d_view,
          edit: this.d_edit,
          add: this.d_add,
          delete: this.d_delete
        },

        brand: {
          view: this.b_view,
          edit: this.b_edit,
          add: this.b_add,
          delete: this.b_delete
        },

        product: {
          view: this.i_view,
          edit: this.i_edit,
          add: this.i_add,
          delete: this.i_delete
        },

        category: {
          view: this.c_view,
          edit: this.c_edit,
          add: this.c_add,
          delete: this.c_delete
        },


      }
      console.log(updateuser);


      this.userservice.updateUser(id, updateuser)
        .subscribe(() => {
          // console.log(add_dealer);
          this.viewUser();
          // console.log(this.viewUser);

          this.name = "";
          this.email = "";
          this.mobile = "";
        });

   
  }
  // role
  getRole() {
    this.roleservice.getRole()
      .subscribe((data) => {
        //  console.log(account);
        this.role = data;
        // console.log(this.role);

      });
  }

  addRole() {
    
      let role = {
        role: this.accounttype,
        order: {
          view: this.r_o_view,
          edit: this.r_o_edit,
          add: this.r_o_add,
          delete: this.r_o_delete
        },
        dealer: {
          view: this.r_o_view,
          edit: this.r_o_edit,
          add: this.r_o_add,
          delete: this.r_o_delete
        },

        brand: {
          view: this.r_o_view,
          edit: this.r_o_edit,
          add: this.r_o_add,
          delete: this.r_o_delete
        },
        product: {
          view: this.r_i_view,
          edit: this.r_i_edit,
          add: this.r_i_add,
          delete: this.r_i_delete
        },
        category: {
          view: this.r_c_view,
          edit: this.r_c_edit,
          add: this.r_c_add,
          delete: this.r_c_delete
        },
      }
      console.log(role);
      this.roleservice.addRole(role)
        .subscribe(() => {
          this.getRole();
               });
    
  }
  getRoleById(id) {
    this.roleservice.getRoleById(id)
      .subscribe((data) => {
        this.r_id = data._id;
        this.roletype = data.role;
        this.e_o_add = data.order.add;
        this.e_o_edit = data.order.edit;
        this.e_o_view = data.order.view;
        this.e_o_delete = data.order.delete;

        this.e_i_add = data.product.add;
        this.e_i_edit = data.product.edit;
        this.e_i_view = data.product.view;
        this.e_i_delete = data.product.delete;

        this.e_b_add = data.brand.add;
        this.e_b_edit = data.brand.edit;
        this.e_b_view = data.brand.view;
        this.e_b_delete = data.brand.delete;

        this.e_d_add = data.dealer.add;
        this.e_d_edit = data.dealer.edit;
        this.e_d_view = data.dealer.view;
        this.e_d_delete = data.dealer.delete;


        this.e_c_add = data.category.add;
        this.e_c_edit = data.category.edit;
        this.e_c_view = data.category.view;
        this.e_c_delete = data.category.delete;

        console.log(data);


      });
  }
  // edit role
  editRole() {
      let id = this.r_id;
      let role = {
        _id: this.r_id,
        role: this.roletype,
        order: {
          view: this.e_o_view,
          edit: this.e_o_edit,
          add: this.e_o_add,
          delete: this.e_o_delete
        },
        dealer: {
          view: this.e_d_view,
          edit: this.e_d_edit,
          add: this.e_d_add,
          delete: this.e_d_delete
        },

        brand: {
          view: this.e_b_view,
          edit: this.e_b_edit,
          add: this.e_b_add,
          delete: this.e_b_delete
        },
        product: {
          view: this.e_i_view,
          edit: this.e_i_edit,
          add: this.e_i_add,
          delete: this.e_i_delete
        },
        category: {
          view: this.e_c_view,
          edit: this.e_c_edit,
          add: this.e_c_add,
          delete: this.e_c_delete
        },
      }
      console.log(role);
      this.roleservice.editRole(id, role)
        .subscribe(() => {
          this.getRole();
          // console.log(this.viewUser);

        });
  }
  // type
  getType() {
    this.dealertypeservice.getType()
      .subscribe((data) => {
        console.log('type' + data);
        this.dealertype = data;
        console.log(this.dealertype);

      });
  }

  addType() {
   
      let add_type = {
        type: this.d_type,
        discount: this.discount,
      }
      console.log(add_type);
      this.dealertypeservice.addType(add_type)
        .subscribe(() => {
          this.d_type = null;
          this.discount = null;
          this.getType();
          // console.log(this.viewUser);
       
        });
    
  }
  // edit type
  getTypeById(id) {
    this.dealertypeservice.getTypeById(id)
      .subscribe((data) => {
        this.t_id = data._id;
        this.type = data.type;
        this.disc = data.discount;
        // console.log(this.t_id);
      });
  }
  // edit type
  editType() {
   
      let id = this.t_id;
      let updatedealer = {
        id: this.t_id,
        type: this.type,
        discount: this.disc,
      }
      this.dealertypeservice.editType(id, updatedealer)
        .subscribe(() => {
          this.getType();
        
        });
    
  }
  getRoleValue(id) {
    this.rolevalue = true;
    this.roleservice.getRoleById(id)
      .subscribe((data) => {
        this.r_id = data._id;
        this.roletype = data.role;
        this.a_o_add = data.order.add;
        this.a_o_edit = data.order.edit;
        this.a_o_view = data.order.view;
        this.a_o_delete = data.order.delete;

        this.a_i_add = data.product.add;
        this.a_i_edit = data.product.edit;
        this.a_i_view = data.product.view;
        this.a_i_delete = data.product.delete;

        this.a_b_add = data.brand.add;
        this.a_b_edit = data.brand.edit;
        this.a_b_view = data.brand.view;
        this.a_b_delete = data.brand.delete;

        this.a_d_add = data.dealer.add;
        this.a_d_edit = data.dealer.edit;
        this.a_d_view = data.dealer.view;
        this.a_d_delete = data.dealer.delete;


        this.a_c_add = data.category.add;
        this.a_c_edit = data.category.edit;
        this.a_c_view = data.category.view;
        this.a_c_delete = data.category.delete;

        console.log(this.a_d_add);


      });

  }
}

