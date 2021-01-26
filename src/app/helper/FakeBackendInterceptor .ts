import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users') as string) || [];
//For Admin
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhZmlrIE1vbmRhbCIsImFkbWluIjp0cnVlfQ.MhsuulTMHbYFJum8IJi8mOjeYWoG2EA1JG_fN2K8FSE';
//For No Admin
//let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhZmlrIE1vbmRhbCIsImFkbWluIjpmYWxzZX0.K3K471iGjtjtb7kq8fGyfLcVNpWFBlDBGFDTX9eFY3I';


@Injectable({
    providedIn: 'root'
  })
export class FakeBackendInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(1000))
            .pipe(dematerialize());
        
        function handleRoute() {
            console.log("API URL::"+url);
            switch (true) {
                case url.endsWith('/api/fakeauthenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/api/fakeregister') && method === 'POST':
                    return register();
                case url.endsWith('/api/fakseorders') && method === 'GET':
                    return orders();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        function authenticate() {
            const { username, password } = JSON.parse(body);
            //const user = users.find((x:any) => x.username === username && x.password === password);
            //if (!user) return error('Username or password is incorrect');
            console.log(JSON.parse(body));
            console.log("username::"+username+" ,password::"+password);
            if (username === 'admin@sweetyselection.com' && password === '12345678a') {
                return ok({
                    "id": 50,
                    "name": "Rafik Mondal",
                    "admin":true,
                    token: token
                  })
            }else{
                return error('Username or password is incorrect');
            }
        }

        function orders() {
            console.log(headers);
            console.log("Authorization::"+headers.get('Authorization'));

            if(headers.get('Authorization') === 'Bearer '+token){
                let orders = [
                    {order_id:1,amount:1000},
                    {order_id:2,amount:1500},
                    {order_id:3,amount:2000}
                ]
                return ok({orders:orders});
            }else{
                return unauthorized()
            }
        }


        function register() {
            const user = body

            if (users.find((x:any) => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map((x:any) => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find((x:any) => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find((x:any) => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter((x:any) => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?:any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message:any) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer '+token;
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

    }
    

}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};