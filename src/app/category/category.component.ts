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
import { ProductService } from '../services/product.service';

declare var $: any;

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
    private productservice:ProductService,
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
          title: "Edit Category  :" + this.name,
          user_id: localStorage.user_id,
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
            user_id: localStorage.user_id,
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
          this.selectedValue = null;
          this.ename = null;
         
        });
   
  }

  delete(id) {
    let catid = id;
  
    this.productservice.getProduct()
      .subscribe((Product) => {
        console.log(Product);
        let flag = false;
        for (let index = 0; index < Product.length; index++) {
          if (catid === Product[index].category_id) {
            flag = true;
            alert("This Category Also Exists In Some other Products. So, It Can Not Be Deleted.");
            break;
          }
        }

        if (flag == false) {
          this.ConfirmDelete(id);
        }
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
    let id = localStorage.user_id;
    console.log('log' + localStorage.user_id);
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
