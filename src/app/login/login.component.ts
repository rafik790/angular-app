import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  message:string 
  constructor(
    private router: Router, 
    private route:ActivatedRoute,
    private authService: AuthService) { 
      this.invalidLogin= false;
      this.message="";
    }

  ngOnInit(): void {
  }

  signIn(credentials:any) {
    console.log(credentials);
    this.authService.login(credentials)
      .subscribe((data:boolean)=>{
        console.log(data);
        this.invalidLogin = !data;
        if(!this.invalidLogin){
          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          this.router.navigate([returnUrl || "/"]);
        }
      },(error:any)=>{
        console.log("error::"+error);
        this.message = error;
        this.invalidLogin = true;
      });

      console.log("signIn::"+this.invalidLogin);
  }

}
