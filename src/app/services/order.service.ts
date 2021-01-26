import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';


@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() { 
    let token = localStorage.getItem("token");
    
    let headers = new HttpHeaders({
      Authorization:'Bearer '+token
    });

    let options = {
      headers: headers
   }

    return this.http.get('/api/orders',options);
  }
}
