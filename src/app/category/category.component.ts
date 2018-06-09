import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { environment } from '../../environments/environment';
import { Category } from '../model/category';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import * as io from 'socket.io-client';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  socket;

  user_id: String;
  brand: Brand[];
  category: Category[];
  id: String;
  name: String;
  ename: String;
  brand_id: String;
  selectedValue: any;
  editedValue: any;


  // user
  c_add: boolean;
  c_edit: boolean;
  c_view: boolean;
  c_delete: boolean;



  constructor(private CategoryService: CategoryService,
    private BrandService: BrandService,
    private userservice: UserService,
    private router: Router,
    private loginservice: LoginService,
    private notificationService: NotificationService) {
    this.socket = io('https://jasmatech-backend-api.herokuapp.com');
  }

  ngOnInit() {

    if (this.loginservice.token == null) {
      this.router.navigate(["/login"]);
    }


    this.getuser(this.user_id);
    this.getCategory();
    this.getBrand();

  }

  /*display brand*/
  getBrand() {
    this.BrandService.getBrand()
      .subscribe(Brand => {
        this.brand = Brand;

        console.log(this.brand);


      });
  }

  /*get Category by id */
  getCategoryById(id) {
    this.CategoryService.getCategoryById(id)
      .subscribe(data => {
        this.name = data.name;
        this.editedValue = data.brand_id;
        this.id = data._id;
        console.log(data);
      });


  }
  /* Update Category Name*/
  updateCategory() {
    let cat = {
      _id: this.id,
      name: this.name,
      brand_id: this.editedValue,



    }
    this.CategoryService.editCategory(cat)
      .subscribe((data) => {
        let date_time = Date.now();
        let event_id = "ca_" + data._id;

        let notification = {
          title: "Edit Category  :"+ this.name, 
          user_id: environment.user_id,
          event_id: event_id,
          date_time: date_time,
          read: false

        }
        // console.log(notification);
        this.socket.emit('new-event', { data: cat });
        this.notificationService.addNotification(notification)
          .subscribe(() => {

          });

        this.getCategory();
        this.name = "";
        this.editedValue = "";
        // this.getBrand();
        console.log(cat);
      });
  }



  /*display Category*/
  getCategory() {
    this.CategoryService.getCategory()
      .subscribe(Category => {
        this.category = Category;
      });
  }
  /* Category add*/
  addCategory() {
    let addcat = {
      brand_id: this.selectedValue,
      name: this.ename
    }
    console.log(addcat);
    this.CategoryService.addCategory(addcat)
      .subscribe((res) => {
        let date_time = Date.now();
        let event_id = "ca_" + res.data._id;
        console.log(event_id);
        console.log(res);


        let notification = {
          title: "new Category Add" + this.ename,
          user_id: environment.user_id,
          event_id: event_id,
          date_time: date_time,
          read: false

        }
        // console.log(notification);
        this.socket.emit('new-event', { data: addcat });
        this.notificationService.addNotification(notification)
          .subscribe(() => {

          });

        // console.log(addCategory);
        this.getCategory();
        this.selectedValue ="";
          this.ename ="";

      });

  }

  /*delete Category */
  ConfirmDelete(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x)
      return this.deleteCategory(id);

    else
      return false;
  }


  deleteCategory(id) {
    this.CategoryService.deleteCategory(id)
      .subscribe(result => {
        console.log(result);
        this.getCategory();
      });
  }

  getuser(user_id) {
    let id = environment.user_id;
    console.log('log' + environment.user_id);


    this.userservice.getUserById(id)
      .subscribe((data) => {
        this.c_add = data.category.add;
        this.c_edit = data.category.edit;
        this.c_view = data.category.view;
        this.c_delete = data.category.delete;


        //  console.log(account);
        // console.log(data);

      });
  }


}
