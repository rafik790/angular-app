import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  @Output() getLoggedInfo: EventEmitter<any> = new EventEmitter();

  private baseurl="";
  constructor(private http: HttpClient) {
    this.baseurl = environment.api_baseUrl;
  }

  login(credentials:any) {
    
    return this.http.post(this.baseurl+'/api/login', JSON.stringify(credentials))
    .pipe(
      catchError((error:any) => {
          console.log(error.error.messages);
          return throwError(error.error.messages);
        }),
        map((result:any)=>{
          localStorage.setItem("token",result.token);
          let helper = new JwtHelperService();
          let userdetail = helper.decodeToken(result.token).data;
          this.getLoggedInfo.emit(userdetail);
          return true;
        })
    );
  }

  register(formdata:any) {
    
    return this.http.post(this.baseurl+'/api/register', JSON.stringify(formdata))
    .pipe(
      catchError((error:any) => {
          console.log(error);
          return throwError(error);
        }),
        map((result:any)=>{
          localStorage.setItem("token",result.token);
          let helper = new JwtHelperService();
          let userdetail = helper.decodeToken(result.token).data;
          this.getLoggedInfo.emit(userdetail);
          return true;
        })
    );
  }

  logout() { 
    localStorage.removeItem("token");
    this.getLoggedInfo.emit(null);
  }

  isLoggedIn() { 
    let helper = new JwtHelperService();
    let myRawToken = localStorage.getItem("token") as string;
    if(myRawToken==null){
      return false; 
    }

    let decodedToken = helper.decodeToken(myRawToken);
    let expirationDate = helper.getTokenExpirationDate(myRawToken);
    let isExpired = helper.isTokenExpired(myRawToken);
    return !isExpired;

  }

  get currentUser(){
    let helper = new JwtHelperService();
    let myRawToken = localStorage.getItem("token") as string;
    if(myRawToken==null){
      return null; 
    }

    let userdetail = helper.decodeToken(myRawToken).data;
    return userdetail;
  }
}

