import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: Http) { }

  
// homeAds 

getHomeads() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/home_ads')
    .pipe(map( res => res.json()));

}

// get Product by id

getHomeAdsById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/home_ads/' +id)
    .pipe(map( res => res.json()));

}

// add product

addHomeAds(homeads) {    
   return this.http.post(environment.api_url + '/home_ads/',homeads)
    .pipe(map( res => res.json()));

}

// edit product

editHomeAds(id,updatehomeads) {
return this.http.put(environment.api_url + '/home_ads/'+id, updatehomeads)
.pipe(map( res => res.json()));

}

// delete prodcut

deleteHomeAds(id) {

return this.http.delete(environment.api_url + '/home_ads/'+id)
.pipe(map( res => res.json()));

}
/********************************************************************************************* */
// homeAds 

gethomeslider() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/home_slider')
    .pipe(map( res => res.json()));

}

// get Product by id

gethomesliderById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/home_slider/' +id)
    .pipe(map( res => res.json()));

}

// add product

addhomeslider(homeslider) {    
   return this.http.post(environment.api_url + '/new_home_slider/',homeslider)
    .pipe(map( res => res.json()));

}

// edit product

edithomeslider(id,updatehomeslider) {
return this.http.put(environment.api_url + '/home_slider/'+id, updatehomeslider)
.pipe(map( res => res.json()));

}

// delete prodcut

deletehomeslider(id) {

return this.http.delete(environment.api_url + '/home_slider/'+id)
.pipe(map( res => res.json()));

}

//  imgur API

imgurImage(base64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  headers.append('Accept', 'application/json');
  return this.http.post('https://api.imgur.com/3/image',base64, {headers: headers})
  .pipe(map( res => res.json()));
   

}


}
