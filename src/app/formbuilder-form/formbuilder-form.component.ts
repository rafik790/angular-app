import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formbuilder-form',
  templateUrl: './formbuilder-form.component.html',
  styleUrls: ['./formbuilder-form.component.css']
})
export class FormbuilderFormComponent implements OnInit {
  form;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name:['',Validators.required],
      contact: fb.group({
        email:[],
        phone:[]
      }),
      topics:fb.array([])
    });

   }

  ngOnInit(): void {
  }

  addTopic(topic:HTMLInputElement){
    this.topics.push(new FormControl(topic.value));
    topic.value='';
  }

  removeTopic(){
    //let index = this.topics.controls.indexOf(topic);
    //this.topics.removeAt(index);
  }

  get topics(){
    return (this.form.get("topics") as FormArray)
  }

}
