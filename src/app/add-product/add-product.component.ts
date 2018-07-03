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
declare var $: any;

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

  addmodel() {
    this.modeldata.push({
      particular: '',
      price: '',
      size: '',
      grade: '',
      hsn_no:'',
      sgst_no:'',
      cgst_no:'',
      igst_no:'',
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
    this.productservice.imgurImage(this.base64)
      .subscribe((result) => {
        // console.log(result);
        this.p_img = result.data.link;

      });

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

    this.finalArray = this.modeldata;
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
            title: "New Product Add :" +this.name,
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
          // let stock = {
          //   product_id: res.data._id,
          //   qty: this.qty
          // }
          // this.stockservice.addStock(stock)
          //   .subscribe(() => { });
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
                });
    }
  }
