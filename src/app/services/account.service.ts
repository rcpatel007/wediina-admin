import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { map } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: Http,
    private loginservice: LoginService) { }

  // all user
  getAccount() {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginservice.token });
    return this.http.get(environment.api_url + '/account', { headers: headers })
      .pipe(map(res => res.json()));

  }
  // get user by id

  getAccountById(id) {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginservice.token });
    return this.http.get(environment.api_url + '/account/' + id, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // add user

  addAccount(account) {
    let headers = new Headers({ 'x-access-token': '' + this.loginservice.token });
    return this.http.post(environment.api_url + '/account/', account, { headers: headers })
      .pipe(map(res => res.json()));

  }


  editAccount(id, account) {
    let headers = new Headers({ 'x-access-token': '' + this.loginservice.token });
    return this.http.put(environment.api_url + '/update_account/' + id, account, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // edit user

  editRole(id, updateaccount) {
    let headers = new Headers({ 'x-access-token': '' + this.loginservice.token });
    return this.http.put(environment.api_url + '/account/' + id, updateaccount, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // delete user

  deleteAccount(id) {
    let headers = new Headers({ 'x-access-token': '' + this.loginservice.token });

    return this.http.put(environment.api_url + '/account/', +id, { headers: headers })
      .pipe(map(res => res.json()));

  }
}
