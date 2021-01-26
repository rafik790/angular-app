import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { map} from 'rxjs/operators';

export class AsyncValidators{
    static emailExist(service: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors|null> => {
            return new Promise((resolve,reject)=>{
                service.existEmail(control.value)
                    .subscribe((data:boolean)=>{
                        if(data){
                            resolve({emailExist:true});
                        }else{
                            resolve(null);
                        }
                    });
            });
        };
    }
    static phoneExist(service: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors|null> => {
            return new Promise((resolve,reject)=>{
                service.existPhone(control.value)
                    .subscribe((data:boolean)=>{
                        if(data){
                            resolve({phoneExist:true});
                        }else{
                            resolve(null);
                        }
                    });
            });
        };
    }

    static confirmedValidator(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

   
}