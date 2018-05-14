import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  
  auth:any;
  brand: Brand[];
  id: String;
  name: String;
  slang:String;


  constructor(private brandService: BrandService,
              private loginservice: LoginService,
              private router: Router,
              private globals :Globals
            ) { }

  

  ngOnInit() {
    if (this.loginservice.token === null){
      this.router.navigate(["/login"]);
      }
    this.auth = {"email": this.globals.email,"token": this.loginservice.token}

    this.getBrand();
  }


  refresh(){

    this.brand.length=0;
    this.getBrand();  
   
  }

/* brand add*/
  addBrand() {
    let addbrand= {
        name: this.name,
      
    }
      this.brandService.addBrand(addbrand)
                      .subscribe(() => {
                        // this.closeBtn.nativeElement.click();
                        console.log(addbrand);
                        this.getBrand();
                        
                      });
  }
/*get brand by id */
  getBrandById(id){
  this.brandService.getBrandById(id)
                  .subscribe(data => {
                    this.name = data[0].name;
                    this.id = data[0]._id;
                    this.slang =data[0].slang;
                    // console.log(data);
                  });  
                  

 }
/* Update Brand Name*/
// editBrand() {
//       let brand = {  
//         _id: this.id,
//         name: this.name.toUpperCase(),
//         slang:this.slang      
//       }
//       this.brandService.editBrand(brand)
//                       .subscribe(() => {
//                         console.log(brand);
//                         // this.editcloseBtn.nativeElement.click();
//                         this. getBrand();                      
//                       });
//   }
    

  /*display brand*/
  getBrand(){
      this.brandService.getBrand()
                        .subscribe(Brand => {
                          this.brand = Brand;
                        
                  });
    } 

/*delete brand */
  ConfirmDelete(id)
  {

    var x = confirm("Are you sure you want to delete?"+id);
    if (x){
    console.log(this.auth);
             
    return this.deleteBrand(id);
    }
        
    else
      return false;
  }

        
  deleteBrand(id) {
  this.brandService.deleteBrand(id)
                    .subscribe(result => {
                    console.log(result);
                    this.getBrand();
            });
  }

}
