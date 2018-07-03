import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/Category';
import { CityService } from '../services/city.service';
import { City } from '../model/City';
import { UserService } from '../services/user.service';

declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  id: String;
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
  i_add: boolean;
  i_view: boolean;
  i_edit: boolean;
  i_delete: boolean;
  term:any;

  constructor(private router: Router,
    private productservice: ProductService,
    private loginservice: LoginService,
    private userservice: UserService,
    private cityservice: CityService,
    private categoryservice: CategoryService) { }

  ngOnInit() {

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


    if (this.loginservice.token == null) {
      this.router.navigate(["/login"]);
    }

    this.getProduct();
    this.getuser();
  }

  getCategory() {
    this.categoryservice.getCategory()
      .subscribe(Category => {
        this.category = Category;
        console.log(this.category);

      });
  }

  getcity() {
    this.cityservice.getcity()
      .subscribe(City => {
        this.city = City;
        // console.log(this.city);

      });
  }

  getProduct() {
    this.productservice.getProduct()
      .subscribe(Product => {
        this.product = Product;

        this.getcity();
        this.getModelInfo();
        this.getCategory();

        console.log(Product);

      });
  }
  getModelInfo() {
    this.productservice.getProduct()
      .subscribe(Product => {
        for (let i = 0; i < Product.length; i++) {
          this.model_info.push(Product[i].model_info);

        }

        console.log(this.model_info);

      });
  }



  getproductById(id) {
    this.o_img.length = 0;
    this.productservice.getProductById(id)
      .subscribe(data => {
        this.id = data._id;
        this.p_img = data.product_image;

        for (let i = 0; i < data.other_images.length; i++) {

          this.o_img.push(data.other_images[i]);
        }
        console.log(this.o_img);
      });
  }
  // single img update
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

  updateImage() {
    this.productservice.imgurImage(this.base64)
      .subscribe((result) => {
        console.log(result);
        this.p_img = result.data.link;

        let updateimg = {
          _id: this.id,
          product_image: this.p_img,
        }
        console.log(updateimg);
        this.productservice.editimg(updateimg)
          .subscribe((res) => {
            this.getProduct();
            console.log(updateimg);
          });
      });
  }
  /* delete image*/
  deleteimg(o_image) {
    // console.log(o_image);
    for (let i = 0; i < this.o_img.length; i++) {
      if (this.o_img[i] == o_image) {
        this.o_img.splice(i, 1);
      }
    }
    // console.log(this.other_img);
  }

  /*other image update */
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
    console.log(btoa(binaryString));
    this.productservice.imgurotherImage(this.otherbase64)
      .subscribe((result) => {
        this.o_img.push(result.data.link)
        console.log(this.o_img);
      });
  }

  updateOtherImage() {
    let otherupdateimg = {
      _id: this.id,
      other_images: this.o_img,
    }
    console.log(otherupdateimg);
    this.productservice.othereditimg(otherupdateimg)
      .subscribe((res) => {
        this.getProduct();
        console.log(otherupdateimg);
      });
  }


  delete(id) {
    let pid = id;
    console.log(" id " + pid);

    this.productservice.getProductById(id)
      .subscribe((Product) => {
        console.log(Product);
        let flag = true;
        if (Product.model_info.length > 0) {
          alert("This Product Also Exists In Some other MOdels. So, It Can Not Be Deleted.");
          flag = false;
        }
        else {
          this.ConfirmDelete(id);
        }
      });
  }
  /*delete brand */
  ConfirmDelete(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
      return this.deleteProduct(id);
    }
    else
      return false;
  }

  deleteProduct(id) {
    this.productservice.deleteProduct(id)
      .subscribe(result => {
        console.log(result);
        this.getProduct();
      });
  }

  // user
  getuser() {
    let id = localStorage.user_id;

    this.userservice.getUserById(id)
      .subscribe((data) => {
        this.i_add = data.product.add;
        this.i_edit = data.product.edit;
        this.i_view = data.product.view;
        this.i_delete = data.product.delete;
        console.log(data);
      });
  }
  printContent(id){
  
    let  str=document.getElementById(id).innerHTML
      let newwin=window.open('','printwin','left=10,top=10,width=1000,height=800')
      newwin.document.write('<HTML>\n<HEAD>\n')
      newwin.document.write('<TITLE> JasmaTech</TITLE>\n')
      newwin.document.write('<script>\n')
      newwin.document.write('function chkstate(){\n')
      newwin.document.write('if(document.readyState=="complete"){\n')
      newwin.document.write('window.close()\n')
      newwin.document.write('}\n')
      newwin.document.write('else{\n')
      newwin.document.write('setTimeout("chkstate()",2000)\n')
      newwin.document.write('}\n')
      newwin.document.write('}\n')
      newwin.document.write('function print_win(){\n')
      newwin.document.write('window.print();\n')
      newwin.document.write('chkstate();\n')
      newwin.document.write('}\n')
      newwin.document.write('<\/script>\n')
      newwin.document.write('</HEAD>\n')
      newwin.document.write('<BODY onload="print_win()"> <h4 style="text-align:center">Product List </h4> \n\n')
      newwin.document.write(str)
      newwin.document.write('</BODY> \n')
      newwin.document.write('</HTML>\n')
      newwin.document.close()
      }
}
