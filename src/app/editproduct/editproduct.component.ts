import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
declare var $: any;

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
  model_detail = new Array;
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
  modeldata = new Array;
  m_data = [];
  finalArray = [];

  constructor(private route: ActivatedRoute,
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


  deleteModel(type, modelIndex, modelKeyValueIndex) {
    if (type === 'model') {
      this.modeldata.splice(modelIndex, 1);
    } else {
      this.modeldata[modelIndex].keyValue.splice(modelKeyValueIndex, 1);
    }
  }

  getCategory() {
    this.categoryservice.getCategory()
      .subscribe(Category => {
        this.category = Category;
        // console.log(this.category);
      });
  }

  addmodel() {
    this.modeldata.push({
      model_no: '',
      price: '',
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

  getProductById(id) {
    this.Productservice.getProductById(id)
      .subscribe(data => {
        // console.log(data);
        this.id = data._id;
        this.name = data.name;
        this.catValue = data.category_id;
        this.pressure = data.pressure;
        let temp_modeldata = data.model_info;
        this.temp = data.temprature;
        this.p_img = data.product_image;
        this.o_img = data.other_images;
        this.desc = data.desc;

        for (let index = 0; index < temp_modeldata.length; index++) {
          temp_modeldata[index].keyValue = [];
          Object.keys(temp_modeldata[index]).forEach(key => {
            if (key.toString() !== 'model_no' &&
              key.toString() !== 'price' &&
              key.toString() !== 'size' &&
              key.toString() !== 'grade' &&
              key.toString() !== 'keyValue') {

              temp_modeldata[index].keyValue.push(
                { key: key, value: temp_modeldata[index][key] }
              )

              delete temp_modeldata[index][key];
            }
          })
        }
        this.modeldata = [];
        this.modeldata = temp_modeldata;

        console.log(temp_modeldata);


      });
  }

  /*Update order */
  updateProduct() {
    let id = this.id;
    this.finalArray = this.modeldata;
    for (let i = 0; i < this.finalArray.length; i++) {
      for (let index = 0; index < this.finalArray[i].keyValue.length; index++) {
        this.finalArray[i][this.finalArray[i].keyValue[index].key] = this.finalArray[i].keyValue[index].value;
      }
      delete this.finalArray[i].keyValue;
    }
    console.log(this.finalArray);

    let updateproduct = {
      _id: this.id,
      name: this.name,
      category_id: this.catValue,
      pressure: this.pressure,
      temprature: this.temp,
      model_info: this.finalArray,
      product_image: this.p_img,
      other_images: this.o_img,
      desc: this.desc,
    }
    console.log(updateproduct);
    this.Productservice.editProduct(id, updateproduct)
      .subscribe((res) => {
        this.router.navigate(['viewproduct/' + this.id]);
        console.log(res);
      });
  }
}
  