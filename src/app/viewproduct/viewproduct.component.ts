import { Component, OnInit } from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { CategoryService } from '../services/category.service';

declare var $:any;

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  user_id: String;
  id: String;
  product: Product[];
  cat_name: String;
  name: String;
  categoryid: String;
  temp: String;
  pressure: String;
  desc: String;
  model_info = new Array;
  model_no: String;
  base64: any;
  otherbase64: any;
  p_img: String;
  o_img = new Array();
  value: String;
  key = {}
  cat_id: String;
  model_info_array = [];
  keyValue = [];
  modeldata = [];
  modelvalue = [];
  key_array = new Array();

  finalvalue = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginservice: LoginService,
    private Productservice: ProductService,
    private categoryservice: CategoryService

  ) { }

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


    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProductById(this.id);
   
  }


  // single product

  getProductById(id) {
    this.Productservice.getProductById(id)
      .subscribe(data => {
        console.log(data);
        this.id = data._id;
        this.name = data.name;
        this.cat_id = data.category_id;
        this.pressure = data.pressure;
        this.modeldata = data.model_info;
        this.temp = data.temprature;
        this.p_img = data.product_image;
        this.o_img = data.other_images;
        this.desc = data.desc;

        this.Productservice.getProductById(id)
        .subscribe(data => {
          // console.log(data);
  
          for (let i = 0; i < data.length; i++) {
            this.modeldata.push(Object.keys(data[0].model_info));
          }
  
  
          for (let j = 0; j < this.modeldata.length; j++) {
            this.key_array = (Object.keys(this.modeldata[0]));
            this.finalvalue.push(Object.values(this.modeldata[j]));
          }
          console.log(this.finalvalue);
        });

        this.categoryservice.getCategoryById(this.cat_id)
          .subscribe(Category => {
            this.cat_name = Category.name;

          });

        console.log();

        // }
      });
  }

  // get model data

 
}