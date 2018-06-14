import { Component, OnInit } from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Stock } from '../model/stock';
import { StockService } from '../services/stock.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


declare var $: any;

@Component({

  selector: 'app-stockmanagement',
  templateUrl: './stockmanagement.component.html',
  styleUrls: ['./stockmanagement.component.css']
})
export class StockmanagementComponent implements OnInit {

  stock: Stock[];
  productvalue: String;
  product = new Array;
  model_info = new Array;
  modelname: String;
  qty: String;
  modeldata: any;
  final_model_data = new Array;
  final_modle = new Array;
  key_array = new Array;
  model_value = new Array;
  finalvalue = new Array;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginservice: LoginService,
    private productservice: ProductService,
    private stockservice: StockService
  ) { }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }

    this.getStock();
    this.getProduct();

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

  getStock() {
    this.stockservice.getStock()
      .subscribe((Stock) => {
        this.stock = Stock;

        console.log(this.stock);
        this.productservice.getProduct()
          .subscribe(Product => {
            this.product = Product;
            // console.log(this.product);
            for (let i = 0; i < Product.length; i++) {
              this.modeldata = this.product[i].model_info;

              for (let j = 0; j < this.modeldata.length; j++) {
                // this.finalvalue.push(this.modeldata[j]);
                this.model_value.push({ 'id': this.product[i]._id, 'name': this.product[i].name, 'model_no': this.modeldata[j].model_no, 'qty': this.modeldata[j].qty });

              }

              // console.log(this.model_value);
              // this.model_info.push({
              //   'id': this.product[i]._id,
              //   'name': this.product[i].name,
              //   'model_no': Product[i].model_info[0].model_no,
              //   'qty': Product[i].model_info[0].qty
              // });
            }
            // console.log(this.modeldata);


            // console.log(this.model_value);


          });

      });
    // console.log(this.stock);
    // console.log(this.product);
  }

  getProduct() {

    this.productservice.getProduct().
      subscribe((product) => {
        this.product = product; 
      });
    // this.productservice.getProduct()
    //   .subscribe(Product => {
    //     this.product = Product;
    //     console.log(this.product);


    //     for (let i = 0; i < Product.length; i++) {
    //       this.modeldata.push(this.product[i].model_info);

    //       for (let j = 0; j < this.modeldata.length; j++) {
    //         this.finalvalue.push(this.modeldata[i])
    //       }
    //       this.model_value.push({ 'model_no': this.finalvalue[0].model_no, 'qty': this.finalvalue[0].qty });
    //       this.model_info.push({
    //         'id': this.product[i]._id,
    //         'name': this.product[i].name,
    //         'model_no': Product[i].model_info[0].model_no,
    //         'qty': Product[i].model_info[0].qty,
    //       });
    //     }

    //     console.log(this.modeldata);
    //     console.log(this.model_value);


    //   });
  }
  modelNameFetch() {
    let id = this.productvalue;
    this.final_model_data.length = 0;
    this.productservice.getProductById(id)
      .subscribe((res) => {
        for (let index = 0; index < res.model_info.length; index++) {
          this.final_model_data.push(res.model_info[index].model_no);
        }
      });
  }

  addStock() {
    let stock = {
      product_id: this.productvalue,
      model_name:this.model_value,
      qty: this.qty
    }
    console.log( stock);
    
    this.stockservice.addStock(stock)
      .subscribe((res)=>{
        console.log(
          res
        );
        
      });
  }
}
