import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
// import {InputError} from "../error";

import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { CityService } from '../services/city.service';
import { City } from '../model/City';
import { UserService } from '../services/user.service';
import * as io from 'socket.io-client';
import { NotificationService } from '../services/notification.service';
import { StockService } from '../services/stock.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  socket;

  product: Product[];
  city: City[];
  category: Category[];
  name: String;
  categoryid: String;
  temp: String;
  pressure: String;;
  desc: String;;
  model_info = new Array;
  model_no: String;;
  price: String;;
  qty: String;;
  grade: String;
  size: String;
  base64: any;
  otherbase64: any;
  p_img: String;
  o_img = new Array();
  value: String;
  key: String;
  catValue: any;
  cityValue: any;
  model_info_array = [];
  keyValue = [];
  modeldata = [];
  finalArray = [];
  // error msg
  errorName: String = null;
  errorImg: String = null;
  errorOtherImg: String = null;
  errorCateory: String = null;
  errorTemp: String = null;
  errorPressure: String = null;
  errorDesc: String = null;
  errorModel: String = null;
  successMsg: String = null;



  constructor(private router: Router,
    private productservice: ProductService,
    private loginservice: LoginService,
    private cityservice: CityService,
    private categoryservice: CategoryService,
    private notificationService: NotificationService,
    private stockservice: StockService
  ) {
    this.socket = io('https://jasmatech-backend-api.herokuapp.com');
  }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }
    this.getCategory();
  }

  addmodel() {
    this.modeldata.push({
      model_no: '',
      price: '',
      qty: '',
      size: '',
      grade: '',
      keyValue: []
    });
    // this.modeldata.push({ key: '', value: '' })
    console.log(this.modeldata);
  }
  add(index: number) {
    this.modeldata[index].keyValue.push({ key: '', value: '' })
    console.log(this.modeldata);
  }
  getCategory() {
    this.categoryservice.getCategory()
      .subscribe(Category => {
        this.category = Category;
        console.log(this.category);
      });
  }
  /* Image convert base64 */
  imageUpload(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.imagetoBase64.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  imagetoBase64(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
    // console.log(btoa(binaryString));

  }
  /*add or remove input tag*/
  otherImageUpload(event) {
    let files = [].slice.call(event.target.files);
    // console.log(files);
    // input = files.map(f => f.name).join(', ');
    for (let i = 0; i < files.length; i++) {
      if (files) {
        var reader = new FileReader();
        reader.onload = this.otherimagetoBase64.bind(this);
        reader.readAsBinaryString(files[i]);
      }
    }
  }

  otherimagetoBase64(readeEvent) {
    var binaryString = readeEvent.target.result;
    this.otherbase64 = btoa(binaryString);
    // console.log(btoa(binaryString));
    this.productservice.imgurotherImage(this.otherbase64)
      .subscribe((result) => {
        console.log(result);
        this.o_img.push(result.data.link)
      });
    // console.log(this.o_img);
  }

  addProduct() {
    this.productservice.imgurImage(this.base64)
      .subscribe((result) => {
        // console.log(result);
        this.p_img = result.data.link;
        this.finalArray = this.modeldata;
      });
    if (this.name == null ||
      this.p_img == null ||
      this.o_img == null ||
      this.catValue == null ||
      this.temp == null ||
      this.pressure == null ||
      this.desc == null 
      ) {

      this.errorName = "Please Enter Product Name";
      this.errorImg = " please Select Image";
      this.errorOtherImg = "Please Select Other Images";
      this.errorCateory = "Please Select Category";
      this.errorTemp = "Please Enter Tempreture Value";
      this.errorPressure = "Please Enter Pressure Value";
      this.errorDesc = "Please Enter Description";
      

    }
    else if (this.name == null) {
      this.errorName = "Please Enter Product Name";
    }
    else if (this.p_img == null) {
      this.errorImg = " please Select Image";
    }
    else if (this.o_img == null) {
      this.errorOtherImg = "Please Select Other Images";
    }
    else if (this.catValue == null) {
      this.errorCateory = "Please Select Category";
    }
    else if (this.temp == null) {
      this.errorTemp = "Please Enter Tempreture Value";
    }
    else if (this.pressure == null) {
      this.errorPressure = "Please Enter Pressure Value";

    }
    else if (this.desc == null) {
      this.errorDesc = "Please Enter Description";
    }
    else {

      for (let i = 0; i < this.finalArray.length; i++) {
        for (let index = 0; index < this.finalArray[i].keyValue.length; index++) {
          this.finalArray[i][this.finalArray[i].keyValue[index].key] = this.finalArray[i].keyValue[index].value;
        }
        delete this.finalArray[i].keyValue;
      }
      console.log(this.finalArray);
      let product = {
        name: this.name,
        category_id: this.catValue,
        pressure: this.pressure,
        temprature: this.temp,
        model_info: this.finalArray,
        desc: this.desc,
        product_image: this.p_img,
        other_images: this.o_img
      }
      console.log(product);
      // PRODCUT ADD
      this.productservice.addProdcut(product)
        .subscribe((res) => {
          // NOTIFIACITON ADD
          let date_time = Date.now();
          let event_id = "pa_" + res.data._id;

          let notification = {
            title: "new Product  Add",
            user_id: environment.user_id,
            event_id: event_id,
            date_time: date_time,
            read: false
          }
          // console.log(notification);
          this.socket.emit('new-event', { data: product });
          this.notificationService.addNotification(notification)
            .subscribe(() => {
            });
          // STOCK ADD  
          let stock = {
            product_id: res.data._id,
            qty: this.qty
          }
          this.stockservice.addStock(stock)
            .subscribe(() => { });
          this.router.navigate(["/inventory"]);
          console.log(res);

          this.name = null;
          this.catValue = null;
          this.pressure = null;
          this.temp = null;
          this.finalArray = null;
          this.desc = null;
          this.p_img = null;
          this.o_img = null;
          this.successMsg = " Product Succesfully Added"
        });



    }
  }







}
