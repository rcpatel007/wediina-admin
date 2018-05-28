import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  id: String;
  product: Product[];
  category: Category[];
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


  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginservice: LoginService,
    private Productservice: ProductService,
    private categoryservice:CategoryService
  ) { }

  ngOnInit() {

    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }


    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProductById(this.id);
    this.getCategory();

  }

  getCategory() {
    this.categoryservice.getCategory()
      .subscribe(Category => {
        this.category = Category;
        console.log(this.category);

      });
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

  getProductById(id) {
    this.Productservice.getProductById(id)
      .subscribe(data => {
        console.log(data);
        this.id = data._id;
        this.name = data.name;
        this.catValue = data.category_id;
        this. pressure = data.pressure;
        this.modeldata= data.model_info;
        this.temp = data.temprature;
        this.p_img = data.product_image;
        this.o_img = data.other_images;
        this.desc = data.desc;
        
console.log();

                // }
      });

  }
  /*Update order */
  updateProduct() {
    let id =this.id;
      // this.finalArray = this.modeldata;

      // for (let i = 0; i < this.finalArray.length; i++) {
      //   for (let index = 0; index < this.finalArray[i].keyValue.length; index++) {
      //     this.finalArray[i][this.finalArray[i].keyValue[index].key] = this.finalArray[i].keyValue[index].value;
      //   }
      //   delete this.finalArray[i].keyValue;
      // }



      console.log(this.finalArray);


      let updateproduct = {


        _id: this.id,
        name:this.name,
        category_id:this.catValue,
        pressure:this.pressure,
        temprature:this.temp,
        // model_info:this.finalArray,
        product_image:this.p_img,
        other_images:this.o_img,
        desc:this.desc,
           }
      console.log(updateproduct);
      this.Productservice.editProduct(id,updateproduct)
        .subscribe((res) => {
          this.router.navigate(['viewproduct/' + this.id]);

          console.log(res);
        });
    }


}
