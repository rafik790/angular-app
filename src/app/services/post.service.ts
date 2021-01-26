import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "https://jsonplaceholder.typicode.com/posts";
  
  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(this.url)
      .pipe(
        catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent) {
                errorMsg = `Error: ${error.error.message}`;
            } else {
                errorMsg = this.getServerErrorMessage(error);
            }
            return throwError(errorMsg);
        })
      );
  }

  createPost(post:any){
    return this.http.post(this.url,JSON.stringify(post))
        .pipe(
          catchError(error => {
              console.log(error)
              let errorMsg: string;
              if (error.error instanceof ErrorEvent) {
                  errorMsg = `Error: ${error.error.message}`;
              } else {
                  errorMsg = this.getServerErrorMessage(error);
              }
              return throwError(errorMsg);
          })
        );
  }

  deletePost(id:number){
    return this.http.delete(this.url+'/'+id)
          .pipe(
            catchError(error => {
               
                let errorMsg: string;
                if (error.error instanceof ErrorEvent) {
                    errorMsg = `Error: ${error.error.message}`;
                } else {
                    errorMsg = this.getServerErrorMessage(error);
                }
                return throwError(errorMsg);
            })
          );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
}
