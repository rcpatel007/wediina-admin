import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { CityService } from '../services/city.service';
import { City } from '../model/City';




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product[];
  city: City[];
  category: Category[];
  name: String;
  categoryid: String;
  temp: String;
  pressure: String;
  desc: String;
  model_info = new Array;
  model_no: String;
  price: String;
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
    private categoryservice: CategoryService) { }

  ngOnInit() {
    this.getCategory();

  }

  addmodel() {


    this.modeldata.push({
      price: '',
      size: '',
      grade: '',
      model_no: '',
      keyValue: []
    });


    // this.modeldata.push({ key: '', value: '' })

    // console.log(this.model_info_array);


  }
  add(index: number) {

    this.modeldata[index].keyValue.push({ key: '', value: '' })

    // console.log(this.model_info_array);


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

        this.productservice.addProdcut(product)
          .subscribe((res) => {

            this.router.navigate(["/inventory"]);
    
            console.log(res);

          });
      });

  }







}
