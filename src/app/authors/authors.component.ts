import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})

export class AuthorsComponent implements OnInit {
  authors;
  email:string = "test@gmail.com";
  imageUrl1:string = "https://picsum.photos/seed/picsum/200/300";
  imageUrl2:string = "https://picsum.photos/200/300?grayscale";
  imageUrl3:string = "https://picsum.photos/id/237/200/300";
  constructor(service: AuthorsService) {
      this.authors = service.getAuthors();
   }

   onLiClick($event:any){
      console.log($event);
   }

   onKeyEvent(authorname:any){
    console.log("OnKey Event::"+authorname);
   }

   onKeyUpOnEmailBox(){
    console.log("OnKey Event::"+this.email);
   }

  ngOnInit(): void {
  }
  onClickImage(){
    alert("CLick On Me!");
  }

}
