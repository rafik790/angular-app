import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { UserNameValidators } from './username.validators';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('',[Validators.required, UserNameValidators.cannotContainSpace],UserNameValidators.shouldBeUnique),
      password: new FormControl('',[Validators.required])
    }),
    checkMeOut:new FormControl()
  })

 get username(){
   console.log(this.form.get("account.username"));
   return this.form.get("account.username");
 }

 get password(){
   return this.form.get("account.password");
 }

  get f(){
    return this.form.controls;
  }

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.form.value);
    this.form.setErrors({
      invalidLogin:true
    });
  }

}
