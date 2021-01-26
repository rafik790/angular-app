import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn:boolean;
  constructor(private authService:AuthService) { 
    this.isLoggedIn= authService.isLoggedIn();
    
  }

  ngOnInit(): void {
    console.log("Logged In::"+this.isLoggedIn)
  }

}
