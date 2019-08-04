import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: Http) { }
  getVendorCategory() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/vendor_cat')
      .pipe(map( res => res.json()));
  
  }

  // get Product by id

  getVendorCategoryById(id) {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/vendor_cat/' +id)
      .pipe(map( res => res.json()));
  
  }

  // add product

  addVendorCategory(category) {    
     return this.http.post(environment.api_url + '/vendor_cat/',category)
      .pipe(map( res => res.json()));
  
  }
  
  // edit product

  editVendorCategory(id,updatecategory) {
return this.http.put(environment.api_url + '/vendor_cat/'+id, updatecategory)
  .pipe(map( res => res.json()));

}

// delete prodcut
 
  deleteVendorCategory(id) {

  return this.http.delete(environment.api_url + '/vendor_cat/'+id)
  .pipe(map( res => res.json()));

 }
/******************************************************************************************** */
  //Venue detail
  
  
  getVendors() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/vendor')
      .pipe(map( res => res.json()));
  
  }

  // get Product by id

  getVendorById(id) {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/vendor_by_id/' +id)
      .pipe(map( res => res.json()));
  
  }

  // add product

  addVendor(vendor) {    
     return this.http.post(environment.api_url + '/newVendor/',vendor)
      .pipe(map( res => res.json()));
  
  }
  
  // edit product

  editVendor(id, updateVendor) {
return this.http.put(environment.api_url + '/vendor_update/'+id, updateVendor)
  .pipe(map( res => res.json()));

}

// delete prodcut
 
  deleteVendor(id) {

  return this.http.delete(environment.api_url + '/vendor_delete/'+id)
  .pipe(map( res => res.json()));

 }

//  imgur API

 imgurImage(base64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  return this.http.post('https://api.imgur.com/3/image',base64, {headers: headers})
  .pipe(map( res => res.json()));
   

}

imgurotherImage(otherbase64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  headers.append('Accept', 'application/json');
  // headers.append('authorization', 'e22c18840a29adc');
  return this.http.post('https://api.imgur.com/3/image',otherbase64, {headers: headers})
  .pipe(map( res => res.json()));

}

 /* get img by id */
 editimg(updateimg) {
  return this.http.put(environment.api_url + '/Vendor_update_image/'+updateimg._id, updateimg)
  .pipe(map( res => res.json()));
}

 /* get other img by id */
 othereditimg(otherupdateimg) {
  return this.http.put(environment.api_url + '/prod_update_other_images/'+otherupdateimg._id, otherupdateimg)
  .pipe(map( res => res.json()));
}
}
