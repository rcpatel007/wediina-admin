import { Component, OnInit } from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Stock } from '../model/stock';
import { StockService } from '../services/stock.service';



@Component({
  selector: 'app-stockmanagement',
  templateUrl: './stockmanagement.component.html',
  styleUrls: ['./stockmanagement.component.css']
})
export class StockmanagementComponent implements OnInit {

  stock: Stock[];
  product: Product[];
  model_info = new Array;
  modeldata: any;
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

    this.getStock();
    this.getProduct();

  }

  getStock() {
    this.stockservice.getStock()
      .subscribe((Stock) => {
        this.stock = Stock;
        // console.log(this.stock);
        this.productservice.getProduct()
          .subscribe(Product => {
            this.product = Product;
            // console.log(this.product);


            for (let i = 0; i < Product.length; i++) {
              this.modeldata = this.product[i].model_info;
          
              for (let j = 0; j < this.modeldata.length; j++) {
                // this.finalvalue.push(this.modeldata[j]);
                this.model_value.push({'id': this.product[j]._id,'name': this.product[j].name, 'model_no': this.modeldata[j].model_no, 'qty': this.modeldata[j].qty });
              }
              
              // this.model_info.push({
              //   'id': this.product[i]._id,
              //   'name': this.product[i].name,
              //   'model_no': Product[i].model_info[0].model_no,
              //   'qty': Product[i].model_info[0].qty
              // });
            }
            console.log(this.modeldata);

            console.log(this.model_value);


          });

      });
    // console.log(this.stock);
    // console.log(this.product);
  }

  getProduct() {
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
}
