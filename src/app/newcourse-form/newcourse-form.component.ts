import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newcourse-form',
  templateUrl: './newcourse-form.component.html',
  styleUrls: ['./newcourse-form.component.css']
})
export class NewcourseFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  form = new FormGroup({
    topics: new FormArray([])
  });

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
