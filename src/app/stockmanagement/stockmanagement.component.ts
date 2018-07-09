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
  term: String;
  stock: Stock[];
  stock_edit = new Array;
  stock_model = new Array;
  productvalue: String;
  product = new Array;
  model_info = new Array;
  modelname: String;
  qty: Number;
  modeldata: any;
  modeldetail: any;
  size: String;
  grade: String;
  final_model_data = new Array;
  final_modle = new Array;
  key_array = new Array;
  model_value = new Array;
  finalvalue = new Array;
  edit_particular: String;
  edit_qty: String;
  edit_grade: String;
  edit_size: String;
  prod_id: String;
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

    console.log(this.loginservice.token);

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
    this.stock_model.length = 0;
    this.stockservice.getStock()
      .subscribe((Stock) => {
        this.stock = Stock;
        console.log(this.stock);
        for (let index = 0; index < Stock.length; index++) {
          for (let secondindex = 0; secondindex < Stock[index].particulars.length; secondindex++) {
            this.stock_model.push({ "_id": Stock[index]._id, "product_id": Stock[index].product_id, "particular": Stock[index].particulars[secondindex].particular, "qty": Stock[index].particulars[secondindex].qty, "grade": Stock[index].particulars[secondindex].grade, "size": Stock[index].particulars[secondindex].size });

          }
        }

        console.log(this.stock_model);

        // console.log(this.stock);
        // this.productservice.getProduct()
        //   .subscribe(Product => {
        //     this.product = Product;
        //     // console.log(this.product);
        //     for (let i = 0; i < Product.length; i++) {
        //       this.modeldata = this.product[i].model_info;

        //       for (let j = 0; j < this.modeldata.length; j++) {
        //         // this.finalvalue.push(this.modeldata[j]);
        //         this.model_value.push({ 'id': this.product[i]._id, 'name': this.product[i].name, 'model_no': this.modeldata[j].model_no, 'qty': this.modeldata[j].qty });

        //       }

        //       // console.log(this.model_value);
        //       // this.model_info.push({
        //       //   'id': this.product[i]._id,
        //       //   'name': this.product[i].name,
        //       //   'model_no': Product[i].model_info[0].model_no,
        //       //   'qty': Product[i].model_info[0].qty
        //       // });
        //     }
        //     // console.log(this.modeldata);


        //     // console.log(this.model_value);


        //   });

      });
    // console.log(this.stock);
    // console.log(this.product);
  }


  getStockById(id, particular) {
    console.log(id);
    this.prod_id = id;
    this.stockservice.getStockById(id)
      .subscribe((Stock) => {
        console.log(this.prod_id);
        for (let secondindex = 0; secondindex < Stock[0].particulars.length; secondindex++) {
          if (particular == Stock[0].particulars[secondindex].particular) {
            this.edit_particular = Stock[0].particulars[secondindex].particular;
            this.edit_qty = Stock[0].particulars[secondindex].qty;
            this.edit_grade = Stock[0].particulars[secondindex].grade;
            this.edit_size = Stock[0].particulars[secondindex].size;
          }
        }
        console.log(this.edit_particular);
        console.log(this.edit_qty);
      });
  }


  getProduct() {

    this.productservice.getProduct().
      subscribe((product) => {
        this.product = product;
      });
  }
  modelNameFetch(productvalue) {
    let id = this.productvalue;
    this.final_model_data.length = 0;
    this.productservice.getProductById(id)
      .subscribe((res) => {
        for (let index = 0; index < res.model_info.length; index++) {
          this.final_model_data.push(res.model_info[index].particular);
        }
      });
  }

  modelDetail(modelname) {
    let id = this.productvalue;
    this.productservice.getProductById(id)
      .subscribe((res) => {
        for (let index = 0; index < res.model_info.length; index++) {
          if (res.model_info[index].particular == this.modelname) {
            this.modeldetail = res.model_info[index];
            this.grade = res.model_info[index].grade;
            this.size = res.model_info[index].size;

          }
          // console.log(this.modeldetail);


        }
      });
  }
  // stock add

  addStock() {
    let stock = {
      particulars: [{
        particular: this.modelname,
        qty: Number(this.qty),
        grade: this.modeldetail.grade,
        size: this.modeldetail.size
      }],
      product_id: this.productvalue
    }
    let model = [];
    let product_id = this.productvalue;
    let sid: String;
    this.stockservice.getStockById(product_id)
      .subscribe((res) => {
        console.log(product_id);

        let flag = false;
        // console.log(id);
        if (res.length > 0) {
          for (let i = 0; i < res[0].particulars.length; i++) {
            if (res[0].particulars[i].particular == this.modelname) {
              res[0].particulars[i].qty = Number(res[0].particulars[i].qty) + Number(this.qty);
              flag = true;
              break;
            }
            // console.log(res[0]);
          }
          model = res[0].particulars;
          if (flag === false) {
            model.push({
              "particular": this.modelname,
              "qty": Number(this.qty),
              "grade": this.modeldetail.grade,
              "size": this.modeldetail.size
            });
            // console.log(model);
          }

          stock.particulars = model;
          console.log(stock);
          this.stockservice.editStock(product_id, stock)
            .subscribe((result) => {
              console.log(result);
              this.getStock();
              console.log(stock);
            });
        }
        else {
          // tempcart.products = products
          this.stockservice.addStock(stock)
            .subscribe((result) => {
              this.getStock();
              console.log(stock);
            });
          // console.log(tempcart);
        }
      });
    console.log(stock);

  }

  // edit stock
  editsotck() {

    let edit_stock = {
      particulars: [{
        particular: this.edit_particular,
        qty: Number(this.edit_qty),
        grade: this.edit_grade,
        size: this.edit_size
      }],
      product_id: this.prod_id
    }
    let edit_model = [];
    let id = this.prod_id;
    this.stockservice.getStockById(id)
      .subscribe((res) => {
        console.log(id);
        for (let i = 0; i < res[0].particulars.length; i++) {
          if (res[0].particulars[i].particular == this.edit_particular) {
            res[0].particulars[i].qty = Number(this.edit_qty);
            break;
          }
          // console.log(res[0]);
        }
        edit_model = res[0].particulars;

        // console.log(model);
        edit_stock.particulars = edit_model;
        console.log(edit_stock);
        this.stockservice.editStock(this.prod_id, edit_stock)
          .subscribe((result) => {
            console.log(result);
            this.getStock();
            console.log(edit_stock);
          });
      });
  }

  printContent(id) {

    let str = document.getElementById(id).innerHTML
    let newwin = window.open('', 'printwin', 'left=10,top=10,width=1000,height=800')
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
    newwin.document.write('<BODY onload="print_win()"> <h4 style="text-align:center">Dealer Data </h4> \n\n')
    newwin.document.write(str)
    newwin.document.write('</BODY> \n')
    newwin.document.write('</HTML>\n')
    newwin.document.close()
  }

}
