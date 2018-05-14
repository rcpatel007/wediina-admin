import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';

import { AccountService } from '../services/account.service';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';



@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  @ViewChild('add_dealer') add_dealer: ElementRef;
 
auth: any;
account: Account[];
name: string;
cnm: String;
email: String;
mno: String;
address: JSON;
city:String;
gst:String;
type: String;
discount: String;
selectedValue:any;

  constructor(private router: Router,
    private loginservice:LoginService,
     private accountservice: AccountService,
    private globals: Globals) { }
     
  

  ngOnInit() {
    // if (this.loginservice.token === null){
    //   this.router.navigate(["/login"]);
    //   }
    this.auth = {"email": this.globals.email,"token": this.loginservice.token}

   this.viewaccount();
  }

    viewaccount(){
    this.accountservice.getAccount()
                    .subscribe((account) => {
                      //  console.log(account);
                      this.account =  account;
                      // console.log(account);
                      
                    });
  }
  addDealer() {
    let add_dealer= {
        name: this.name,
        company_name: this.cnm,
        email: this.email,
        mobile: this.mno, 
        city:this.selectedValue,
        gst:this.gst,
        type: this.type,
        discount: this.discount

      
    }
    console.log(add_dealer);
    

      this.accountservice.addAccount(add_dealer)
                      .subscribe(() => {
                        this.add_dealer.nativeElement.click();
                        // console.log(add_dealer);
                        this.viewaccount();
                        
                      });
  }



  
}
