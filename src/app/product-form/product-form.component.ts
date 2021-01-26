import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  contactMethods =[
    {id:1,name:"Email"},
    {id:2,name:"Phone"},
  ]

  log(x:any){
    console.log(x)
  }

  submit(data:NgForm){
    console.log(data.value)
  }
}
