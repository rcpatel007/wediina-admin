import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/Brand';
import { LoginService } from '../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Globals } from '../../globals';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { AccountService } from '../services/account.service';
import { CityService } from '../services/city.service';
import { Account } from '../model/Dealer';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {
  // searchTerm: FormControl = new FormControl();

  socket;
  dealer: Account[];
  brand: Brand[];
  model = new Array;
  category = new Array;
  product = new Array;
  user_id: String;
  user_name: String;
  user_company_name: String;
  user_gst: String;
  user_city: String;
  user_email: String;
  user_mobile: String;
  user_type: String;
  user_discount: number;
  user_address = new Array;
  user_state: String;
  pid: String;
  name: String;
  desc: String;
  particular: String;
  qty: number;
  address:String;
  state:String;
  city:String;
  price: number;
  p_img: String;
  discount: number;
  cart = new Array;
  cart_pro = new Array;
  total: number;
  subtotal: number = 0;
  grandtotal: number = 0;
  discountotal: number = 0;
  product_id: String;
  product_name: string;
  sgst: number = 0;
  cgst: number = 0;
  igst: number = 0;
  sgst_total: number = 0;
  cgst_total: number = 0;
  igst_total: number = 0;

  isGujarat: boolean;

  constructor(private loginservice: LoginService,
    private brandservice: BrandService,
    private categoryservice: CategoryService,
    private productservice: ProductService,
    private accountservice: AccountService,
    private router: Router,
    private cityservice: CityService,
    private cartservice: CartService

  ) {
    this.socket = io('https://jasmatech-backend-api.herokuapp.com');
  }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }
    this.getDealerDetail();
    this.getBrand();

  }
  // get all dealer
  getDealerDetail() {
    this.accountservice.getAccount()
      .subscribe((account) => {
        this.dealer = account;
        console.log(this.dealer);
      });
  }

  // get dealer by id

  getUser(user) {
    let id = user;
    let address =[];
    this.accountservice.getAccountById(id)
      .subscribe((res) => {
        this.user_id = res._id;
        this.user_name = res.name;
        this.user_company_name = res.company_name;
        this.user_gst = res.gst;
        this.user_city = res.city;
        this.user_email = res.email;
        this.user_state = res.state;
        this.user_mobile = res.mobile;
        this.user_type = res.type;
        this.user_discount = res.discount;
        // address = res.address;

        for (let index = 0; index < res.address.office.length; index++) {
          // this.officeAddress.push(res.address.office[index]);
          var arr=res.address.office[index].split(':');
           this.user_address.push(
             {
               type:"office",
               add:arr
             }
           )
          }
        console.log(this.user_address);
        console.log(res);
        this.ShowCart();
      });
  }


  // get brand
  getBrand() {
    this.brandservice.getBrand()
      .subscribe((Brand) => {
        this.brand = Brand;
        console.log(this.brand);

      })
  }
  getCategory(bid) {
    let id = bid;
    this.category.length = 0;
    this.categoryservice.getCategory()
      .subscribe((Category) => {
        for (let index = 0; index < Category.length; index++) {
          if (Category[index].brand_id == id)
            this.category.push(Category[index]);
        }
        console.log(this.category);
      });
  }

  getprod(pid) {

    let id = pid;
    this.product.length = 0;
    this.productservice.getProduct()
      .subscribe((Product) => {
        for (let index = 0; index < Product.length; index++) {
          if (Product[index].category_id == id) {
            this.product.push(Product[index]);

          }
        }
        console.log(this.product);

      });
  }

  getmodel(mid) {
    let id = mid;
    this.product_id = mid;
    this.model.length = 0;
    this.productservice.getProductById(id)
      .subscribe((res) => {
        this.pid = res._id;
        this.name = res.name;
        this.p_img = res.product_img;

        this.desc = res.desc;
        for (let index = 0; index < res.model_info.length; index++) {
          this.model.push(res.model_info[index]);
        }
      });
  }

  getprice(particular) {
    let id = this.product_id;
    this.model.length = 0;
    this.productservice.getProductById(id)
      .subscribe((res) => {

        for (let index = 0; index < res.model_info.length; index++) {
          if (particular == res.model_info[index].particular) {
            this.price = res.model_info[index].price;
            this.cgst = res.model_info[index].cgst_no;
            this.sgst = res.model_info[index].sgst_no;
            this.igst = res.model_info[index].igst_no;
          }
        }
      });
    console.log(this.discount);

  }


  addtocart() {
    // let products :[];
    let tempcart = {
      products: [{
        "product_id": this.pid,
        "prod_name": this.name,
        "model_no": this.particular,
        "qty": Number(this.qty),
        "desc": this.desc,
        "price": this.price,
        "cgst_no": this.cgst,
        "sgst_no": this.sgst,
        "igst_no": this.igst,
        "product_img": this.p_img
      }],
      user_id: this.user_id
    }
    console.log(tempcart);

    let products = [];
    // console.log(product);
    let id = this.user_id;
    this.cartservice.getCart(this.user_id)
      .subscribe((res) => {
        // let id = res[0]._id;
        let flag = false;
        // console.log(id);
        if (res.length > 0) {
          for (let i = 0; i < res[0].products.length; i++) {
            if (this.particular == res[0].products[i].model_no) {
              res[0].products[i].qty = Number(res[0].products[i].qty) + Number(this.qty);
              flag = true;
              // console.log(tempcart.products[i].qty);
              break;
            }
            // console.log(res[0]);
          }
          products = res[0].products;
          if (flag === false) {
            products.push({
              "product_id": this.pid,
              "prod_name": this.name,
              "model_no": this.particular,
              "qty": Number(this.qty),
              "cgst_no": this.cgst,
              "sgst_no": this.sgst,
              "igst_no": this.igst,
              "desc": this.desc,
              "price": this.price,
              "product_img": this.p_img
            });
            console.log(products);
          }

          tempcart.products = products;
          console.log(tempcart);
          // tempcart.products = products;
          // console.log(tempcart);
          // let f  inal_product = tempcart.products
          let uid = this.user_id;
          this.cartservice.editcart(uid, tempcart)
            .subscribe((result) => {
              console.log(result);
              this.ShowCart();

            });
        }
        else {
          // tempcart.products = products
          this.cartservice.addcart(tempcart)
            .subscribe((result) => {
              console.log(result);
              this.ShowCart();
            });
          // console.log(tempcart);
        }
      });
  }

  ShowCart() {


    let user_id = this.user_id;
    this.cartservice.getCart(user_id)
      .subscribe((Cart) => {
        console.log(Cart);

        for (let i = 0; i < Cart.length; i++) {
          if (Cart[i].user_id == this.user_id) {
            this.cart = Cart[i].products;
            for (let index = 0; index < this.cart.length; index++) {
              this.total = this.cart[index].qty * this.cart[index].price;
              this.subtotal = this.subtotal + this.total;
              this.discountotal = Math.round(this.subtotal * this.user_discount / 100);
            }
          }
        }

        if (this.user_state == 'gujarat') {
          this.isGujarat = true;

          for (let index = 0; index < this.cart.length; index++) {

            let prod_tot = ((this.cart[index].price * this.cart[index].qty));
            let cgst = Math.round(prod_tot * Number(this.cart[index].cgst_no)
              / 100);
            this.cgst_total = this.cgst_total + cgst;
            let sgst = Math.round(prod_tot * Number(this.cart[index].sgst_no) / 100);
            this.sgst_total = this.sgst_total + sgst;
            this.grandtotal = (this.subtotal - this.discountotal) + this.cgst_total + this.sgst_total;

          }

        }
        else {
          this.isGujarat = false;

          for (let index = 0; index < this.cart.length; index++) {
            let prod_tot = ((Number(this.cart[index].price) * this.cart[index].qty));
            let igst = Math.round(prod_tot * Number(this.cart[index].igst_no) / 100);
            this.igst_total = this.igst_total + igst;

            console.log(this.igst_total);
            this.grandtotal = (this.subtotal - this.discountotal) + this.igst_total;

          }

        }

        console.log(this.user_discount);
        console.log(this.cart);

      });
  }

  // send order

  sendOrder() {
    let tempproduct = [];
    let product_array = [];
    this.cartservice.getCart(this.user_id)
      .subscribe((Cart) => {
        console.log(Cart);
        tempproduct = Cart[0].products;
        console.log(tempproduct);

        for (let index = 0; index < tempproduct.length; index++) {
          this.product_id = tempproduct[index].product_id;
          this.product_name = tempproduct[index].prod_name;
          this.particular = tempproduct[index].model_no;
          this.qty = tempproduct[index].qty;
          this.address =this.user_address[0].add[0];
          this.city =this.user_address[0].add[1];
          this.state =this.user_address[0].add[2];
          this.cgst = tempproduct[index].cgst_no;
          this.sgst = tempproduct[index].sgst_no;
          this.igst = tempproduct[index].igst_no;
          this.price = tempproduct[index].price;

          product_array.push({
            "prodcut_id": this.product_id,
            "prod_name": this.product_name,
            "particular": this.particular,
            "qty": this.qty,
            "price": this.price,
            "p_discount": "0"
          })
        }
        console.log(product_array);
        let order = {
          products: product_array,
          user_id: this.user_id,
          o_discount: this.user_discount,
          dealer_email: this.user_email,
          dealer_name: this.user_name,
          address: this.user_address[0].add[0],
          city:this.user_address[0].add[1],
          state:this.user_address[0].add[2],
          shipping_charges:0,
          other_charges:0,
          company_name: this.user_company_name,
          dealer_discount: this.user_discount,
          mobile: this.user_mobile,
          method: "",
          order_date: "",
          _date: "",
          _time: "",
          status: "Received",
          enquiry: false,
        }
        console.log(order);

        this.cartservice.addOrder(order)
          .subscribe((result) => {
            this.cartservice.deletecart(this.user_id)
              .subscribe((result) => {
                // this.Cart();
                console.log(result);
              }); 
            console.log(result);

            this.router.navigate(['vieworder/' + result.data._id]);

          });
      });
  }

}
