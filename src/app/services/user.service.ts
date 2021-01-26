import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl="";
  constructor(private http: HttpClient) {
    this.baseurl = environment.api_baseUrl;
  }

  existEmail(email:string) {
    return this.http.get(this.baseurl+'/api/exist/'+email+'/email')
    .pipe(
      catchError((error:any) => {
          console.log(error.error.messages);
          return throwError(error.error.messages);
        }),
        map((result:any)=>{
          if(result.exist){
            return true;
          }else{
            return false;
          }
        })
    );
  }

  existPhone(phone:string) {
    return this.http.get(this.baseurl+'/api/exist/'+phone+'/phone')
    .pipe(
      catchError((error:any) => {
          console.log(error.error.messages);
          return throwError(error.error.messages);
        }),
        map((result:any)=>{
          if(result.exist){
            return true;
          }else{
            return false;
          }
        })
    );
  }

  uploadFile(fileToUpload: File){
    const endpoint = this.baseurl+'/api/uploadfile';
    const formData: FormData = new FormData();
    formData.append('doc_file', fileToUpload, fileToUpload.name);
    
    return this.http.post(endpoint, formData)
      .pipe(
        catchError((error:any) => {
            console.log(error);
            return throwError(error.error.messages.error);
          }),
          map((result:any)=>{
            return result.path;
          })
      );
}

  

}
