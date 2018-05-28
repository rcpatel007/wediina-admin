import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

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
  key: String;
  catValue: any;
  model_info_array = [];
  keyValue = [];
  modeldata = [];

  finalArray = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginservice: LoginService,
    private Productservice: ProductService,
    private categoryservice: CategoryService

  ) { }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }


    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProductById(this.id);


  }

  getCategory(catValue) {
      let id = catValue;
    console.log('cat' + this.catValue);


    this.categoryservice.getCategoryById(id)
      .subscribe(Category => {
        this.cat_name = Category.name;
        console.log('cate' + Category);

      });
  }

  getProductById(id) {
    this.Productservice.getProductById(id)
      .subscribe(data => {
        console.log(data);
        this.id = data._id;
        this.name = data.name;
        this.catValue = data.category_id;
        this.pressure = data.pressure;
        this.modeldata = data.model_info;
        this.temp = data.temprature;
        this.p_img = data.product_image;
        this.o_img = data.other_images;
        this.desc = data.desc;

        console.log();

        // }
      });
    this.getCategory(this.catValue);
    this.getmodel(id);
  }

  getmodel(id) {
    this.Productservice.getProductById(id)
      .subscribe(data => {
        console.log(data);
        for(let i=0; i<data.length; i++){
        this.modeldata.push(data.model_info.keys);
        
        
      }
        console.log(this.modeldata);

        // }
      });
    }




}
