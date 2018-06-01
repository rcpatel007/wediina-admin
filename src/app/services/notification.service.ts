import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: Http, private loginService:LoginService) { }


  // all notification

  getNotification() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/notification',{headers: headers})
      .pipe(map( res => res.json()));
  }
  
  // single notification

  getNotificationById() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/notification/',{headers: headers})
      .pipe(map( res => res.json()));
  }
  
  // add notification

  addNotification(notification) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.post('https://jasmatech-backend-api.herokuapp.com/notification/',notification,{headers: headers})
      .pipe(map( res => res.json()));
  }

  // edit notification

  editNotification(notification) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.put('https://jasmatech-backend-api.herokuapp.com/notification/',notification,{headers: headers})
      .pipe(map( res => res.json()));
  }
}
