import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean=false;
  loggedUserName:string="";
  isAdmin:boolean=false;
  constructor(private authService:AuthService) { 
   
    
  }

  ngOnInit(): void {
    this.authService.getLoggedInfo.subscribe((logindata:any)=>{
      this.isLoggedIn = this.authService.isLoggedIn();
      console.log("Loggin Flag::"+this.isLoggedIn);
      
      if(this.isLoggedIn){
        this.loggedUserName = logindata.first_name+" "+logindata.last_name;
        if(logindata.user_type_id==1)
          this.isAdmin = true;
        else
        this.isAdmin = false;
        
      }else{
        this.loggedUserName = "";
        this.isAdmin = false;
      }
    });
  }
  
}
