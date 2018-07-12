import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';



@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: Http, private loginService: LoginService) { }

  // all Brand
  getBrand() {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get(environment.api_url + '/brand', { headers: headers })
      .pipe(map(res => res.json()));

  }

  // get brand by id

  getBrandById(id) {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get(environment.api_url + '/brand/' + id, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // add brand

  addBrand(addbrand) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post(environment.api_url + '/brand', addbrand, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // edit brand

  editBrand(brand) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.put(environment.api_url + '/brand/' + brand._id, brand, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // delete brand

  deleteBrand(id) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.delete(environment.api_url + '/brand/' + id, { headers: headers })
      .pipe(map(res => res.json()));

  }



}


