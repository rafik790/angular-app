import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncValidators } from '../helper/user.validator';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patient-registration-form',
  templateUrl: './patient-registration-form.component.html',
  styleUrls: ['./patient-registration-form.component.css']
})
export class PatientRegistrationFormComponent implements OnInit {
  countryLst =[
    {country_id:1,country:"Afghanistan"},
    {country_id:101,country:"India"},
  ]

  registerForm:FormGroup;
  invalidForm:boolean;
  errorMessage:string;
  get first_name(){return this.registerForm.get("first_name");}
  get last_name(){return this.registerForm.get("last_name");}
  get age(){return this.registerForm.get("age");}
  get profession(){return this.registerForm.get("profession");}
  get address(){return this.registerForm.get("address");}
  get country_id(){return this.registerForm.get("country_id");}
  get email(){return this.registerForm.get("email");}
  get phone(){return this.registerForm.get("phone");}
  get password(){return this.registerForm.get("password");}
  get confirmPassword(){return this.registerForm.get("confirmPassword");}

  constructor(private service: UserService,
      private formBuilder: FormBuilder,
      private authService:AuthService,
      private router: Router) {
        
        this.invalidForm = false;
        this.errorMessage = "";
        this.registerForm = this.formBuilder.group({});
  }
  
  passwordMatchValidator(frm: FormGroup) {
    return this.password?.value === this.confirmPassword?.value ? null : {'mismatch': true};
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required]),
      profession: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      country_id: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email],AsyncValidators.emailExist(this.service)),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)],AsyncValidators.phoneExist(this.service)),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      will_receive_news:new FormControl(true),
      user_type_id:new FormControl(3),
    },{
      validator: AsyncValidators.confirmedValidator('password', 'confirmPassword')
    }
    );


  }

  register(){
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value)
      .subscribe((data:boolean)=>{
        console.log(data);
        this.invalidForm = !data;
        if(!this.invalidForm){
          this.router.navigate(["/patienthome"]);
        }
      },(error:any)=>{
        console.log("error::"+error);
        this.errorMessage = error;
        this.invalidForm = true;
      });
      
  }

}
