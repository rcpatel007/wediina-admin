import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';

import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  product: Product[];
  category: Category[];
  name:String;
  categoryid:String;
  temp:String;
  pressure:String;
  desc:String;
  model_info:String;
  base64:any;
  otherbase64: any;
  p_img:String;
  o_img = new Array();


  constructor(private router:Router, 
              private productservice:ProductService,
              private loginservice:LoginService,
            private categoryservice: CategoryService) { }

  ngOnInit() {
  this.getProduct();
  this.getCategory();
}

  getCategory(){
    this.categoryservice.getCategory()
                     .subscribe(Category => {
                       this.category = Category;
               });
    } 

  getProduct(){
    this.productservice.getProduct()
        .subscribe(Product => {
          this.product = Product;
        
      console.log(Product);
      
       });
  }
 /* Image convert base64 */
 imageUpload(evt){
  var files = evt.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();

    reader.onload =this.imagetoBase64.bind(this);

    reader.readAsBinaryString(file);
}
}


imagetoBase64(readerEvt) {
var binaryString = readerEvt.target.result;
       this.base64= btoa(binaryString);
      // console.log(btoa(binaryString));
       
}

/*add or remove input tag*/ 



otherImageUpload(event) {
let files = [].slice.call(event.target.files);
// console.log(files);
// input = files.map(f => f.name).join(', ');
for(let i=0; i<files.length; i++){
  if (files) {
        var reader = new FileReader();
        reader.onload =this.otherimagetoBase64.bind(this);
        reader.readAsBinaryString(files[i]);
    
  }
}
}

otherimagetoBase64(readeEvent) {

var binaryString = readeEvent.target.result;
      
this.otherbase64= btoa(binaryString);
    console.log(btoa(binaryString));
    this.productservice.imgurotherImage(this.otherbase64)
    .subscribe((result) => {
     console.log(result);
     this.o_img.push(result.data.link)
    });
    console.log(this.o_img);
    
}


  addProduct(){
    this.productservice.imgurImage(this.base64)
    .subscribe((result) => {
      console.log(result);
      this.p_img=result.data.link;
  
    let product ={
      name:this.name,
      category_id:this.categoryid,
      pressure:this.pressure,
      temprature:this.temp,
      model_info:this.model_info,
      desc:this.desc,
      product_image:this.p_img,
      other_images:this.o_img
    }
    console.log(Product);
    
  this.productservice.addProdcut(product)
        .subscribe((res) => {
        
          this.getProduct();
      console.log(Product);
    
  });
});

}

}
