import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  brand: Brand[];
  category: Category[];
  id: String;
  name: String;
  ename: String;
  brand_id:String;
  selectedValue:any;
  editedValue:any;
  
 
  constructor(private CategoryService: CategoryService, private BrandService: BrandService) { }

  ngOnInit() {
    this.getCategory();
    this.getBrand();
    
  }

/*display brand*/
getBrand(){
  this.BrandService.getBrand()
                   .subscribe(Brand => {
                     this.brand = Brand;

                     console.log(this.brand);
                     
                    
              });
} 
/* Category add*/

/*get Category by id */
getCategoryById(id){
this.CategoryService.getCategoryById(id)
              .subscribe(data => {
                this.name = data[0].name;
                this.id = data[0]._id;
                console.log(data);
              });  
              

}
/*display Category*/
getCategory(){
this.CategoryService.getCategory()
                 .subscribe(Category => {
                   this.category = Category;
           });
} 
/* Category add*/
addCategory() {
  let addcat= {
      brand_id:this.selectedValue,
      name: this.ename
    }
  console.log(addcat);
    this.CategoryService.addCategory(addcat)
                    .subscribe(() => {
                      // console.log(addCategory);
                      this.getCategory();
                    });
                    
}

/*delete Category */
ConfirmDelete(id)
{
var x = confirm("Are you sure you want to delete?");
if (x)
  return this.deleteCategory(id);
else
return false;
}

  
deleteCategory(id) {
this.CategoryService.deleteCategory(id)
             .subscribe(result => {
              console.log(result);
              this.getCategory();
      });
}


}
