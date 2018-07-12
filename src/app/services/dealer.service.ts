import { Injectable } from '@angular/core';
import { RequestOptions, Response  } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoginService } from '../../app/services/login.service';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private http: Http, private loginService:LoginService) { 
    
  }
 
  // all Dealer type
  getDealerType() {
    //  headers = new Headers();    
    let headers = new Headers();    
        headers = new Headers({'x-access-token':''+ this.loginService.token});
      let options = new RequestOptions({ headers: headers });
 
        return this.http.get(environment.api_url + '/dealer_type',options)
      .pipe(map( (response: Response) => response.json()));
        
  
  }

  // get Dealer type by id

  getDealerTypeById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token':''+ this.loginService.token});
      return this.http.get(environment.api_url + '/dealer_type' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add Dealer type

  addDealerType(dealer) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post(environment.api_url + '/dealer_type',dealer, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit dealertype

  editDealerType(id, updatedealer) {
  let headers = new Headers({'x-access-token':+ this.loginService.token });
  return this.http.put(environment.api_url + '/dealer_type',+id, updatedealer)
  .pipe(map( res => res.json()));

}

// delete dealer type
 
  deleteDealerType(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});

  return this.http.put(environment.api_url + '/dealer_type',+id, {headers: headers})
  .pipe(map( res => res.json()));

}






}