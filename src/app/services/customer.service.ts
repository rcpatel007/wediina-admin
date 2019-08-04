import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: Http) { }


  
  getCustomer() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/customer')
      .pipe(map( res => res.json()));
  
  }

}
