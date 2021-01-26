import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncValidators } from '../helper/user.validator';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-doctor-registration-form',
  templateUrl: './doctor-registration-form.component.html',
  styleUrls: ['./doctor-registration-form.component.css']
})
export class DoctorRegistrationFormComponent implements OnInit {
  countryLst =[
    {country_id:1,country:"Afghanistan"},
    {country_id:101,country:"India"},
  ]

  fileToUpload:any;
  registerForm:FormGroup;
  invalidForm:boolean;
  errorMessage:string;
  get first_name(){return this.registerForm.get("first_name");}
  get last_name(){return this.registerForm.get("last_name");}
  get email(){return this.registerForm.get("email");}
  get phone(){return this.registerForm.get("phone");}
  get password(){return this.registerForm.get("password");}
  get confirmPassword(){return this.registerForm.get("confirmPassword");}
  get country_id(){return this.registerForm.get("country_id");}
  get address(){return this.registerForm.get("address");}

  get profession_statement(){return this.registerForm.get("profession_statement");}
  get practicing_from(){return this.registerForm.get("practicing_from");}
  get consultation_fee(){return this.registerForm.get("consultation_fee");}
  get time_slot_per_patient_in_min(){return this.registerForm.get("time_slot_per_patient_in_min");}
  get uploader_field(){return this.registerForm.get("uploader_field");}

  constructor(private service: UserService,
      private formBuilder: FormBuilder,
      private authService:AuthService,
      private router: Router) {
        
        this.invalidForm = false;
        this.errorMessage = "";
        this.registerForm = this.formBuilder.group({});
        this.fileToUpload = "";
  }
  
  passwordMatchValidator(frm: FormGroup) {
    return this.password?.value === this.confirmPassword?.value ? null : {'mismatch': true};
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email],AsyncValidators.emailExist(this.service)),
      phone: new FormControl('',[Validators.required,Validators.minLength(10)],AsyncValidators.phoneExist(this.service)),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      country_id: new FormControl('',[Validators.required]),

      profession_statement: new FormControl('',[Validators.required]),
      practicing_from: new FormControl('',[Validators.required]),
      consultation_fee: new FormControl('',[Validators.required]),
      time_slot_per_patient_in_min: new FormControl(5),
      document_url: new FormControl(''),
      uploader_field: new FormControl('',[Validators.required]),
      will_receive_news:new FormControl(true),
      user_type_id:new FormControl(2),
    },{
      validator: AsyncValidators.confirmedValidator('password', 'confirmPassword')
    }
    );


  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
        return;
    }
    this.fileToUpload = input.files.item(0);
    this.uploader_field?.setValue(this.fileToUpload.name);
  }

  register(){
    if (this.registerForm.invalid) {
      alert("Form is not valid");
      return;
    }

    this.service.uploadFile(this.fileToUpload)
      .subscribe((uploadedurl:string)=>{

        let jasonObj:any = this.registerForm.value;
        let practicing_from = jasonObj.practicing_from;

        let month:string;
        if(practicing_from.month<10){
          month="0"+practicing_from.month;
        }else{
          month=practicing_from.month;
        }

        let days:string;
        if(practicing_from.day<10){
          days="0"+practicing_from.day;
        }else{
          days=practicing_from.day;
        }


        jasonObj.practicing_from=practicing_from.year+'-'+month+"-"+practicing_from.day;
        jasonObj.document_url=uploadedurl;

        console.log(jasonObj);

        this.authService.register(jasonObj)
            .subscribe((data:boolean)=>{
              console.log(data);
              this.invalidForm = !data;
              if(!this.invalidForm){
                this.router.navigate(["/doctorhome"]);
              }
            },(error:any)=>{
              console.log("error::"+error);
              this.errorMessage = error;
              this.invalidForm = true;
            });

      },(error:any)=>{
        console.log("error::"+error);
        this.errorMessage = error;
        this.invalidForm = true;
      });

      
  }
}
