import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',//<courses>
    template:`
        <h2>{{ "Title: " + title }}</h2>
        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>
        <button class="btn btn-primary">Save</button>
    `
})
export class CoursesComponent{
    title = "List Of Courses";
    courses;
    constructor(service: CoursesService){
        this.courses = service.getCourses();
    }
}