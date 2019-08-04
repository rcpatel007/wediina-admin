import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: Http) {  }

// category 

  getVenueCategory() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/venue_cat')
      .pipe(map( res => res.json()));
  
  }

  // get Product by id

  getVenueCategoryById(id) {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/venue_cat/' +id)
      .pipe(map( res => res.json()));
  
  }

  // add product

  addVenueCategory(category) {    
     return this.http.post(environment.api_url + '/venue_cat/',category)
      .pipe(map( res => res.json()));
  
  }
  
  // edit product

  editvenueCategory(id,updatecategory) {
return this.http.put(environment.api_url + '/venue_cat/'+id, updatecategory)
  .pipe(map( res => res.json()));

}

// delete prodcut
 
  deleteVenueCategory(id) {

  return this.http.delete(environment.api_url + '/venue_cat/'+id)
  .pipe(map( res => res.json()));

 }
/******************************************************************************************** */
  //Venue detail
  
  
  getVenues() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/venue')
      .pipe(map( res => res.json()));
  
  }

  // get Product by id

  getVenueById(id) {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/venue_by_id/' +id)
      .pipe(map( res => res.json()));
  
  }

  // add product

  addVenue(venue) {    
     return this.http.post(environment.api_url + '/newvenue/',venue)
      .pipe(map( res => res.json()));
  
  }
  
  // edit product

  editVenue(id,updateVenue) {
return this.http.put(environment.api_url + '/venue_update/'+id, updateVenue)
  .pipe(map( res => res.json()));

}

// delete prodcut
 
  deleteVenue(id) {

  return this.http.delete(environment.api_url + '/venue_delete/'+id)
  .pipe(map( res => res.json()));

 }

//  imgur API

 imgurImage(base64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  headers.append('Accept', 'application/json');
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
  return this.http.put(environment.api_url + '/venue_update_image/'+updateimg._id, updateimg)
  .pipe(map( res => res.json()));


}
 /* get other img by id */
 othereditimg(otherupdateimg) {
  return this.http.put(environment.api_url + '/prod_update_other_images/'+otherupdateimg._id, otherupdateimg)
  .pipe(map( res => res.json()));


}
}
