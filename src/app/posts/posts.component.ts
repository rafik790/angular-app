import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  errorMsg: string;
  constructor(private service: PostService) { 
    this.errorMsg="";
  }

  ngOnInit(): void {
    this.service.getPosts()
    .subscribe(
        data=>{
          this.posts = (data as []);
          console.log(this.posts);
        },
        (error)=>{
          this.errorMsg = error;
        });
  }

  createPost(input:HTMLInputElement){
    let post:any = {title: input.value};
    this.service.createPost(post)
      .subscribe(
        data=>{
            post.id = (data as any).id;
            this.posts.splice(0,0,post);
        },
        (error)=>{
          this.errorMsg = error;
          
      });

    input.value="";
    
  }
  updatePost(post:any){
    console.log(post);
  }

  deletePost(post:any){
    this.service.deletePost(434)
      .subscribe(
        (respose) =>{
          let index = this.posts.indexOf(post);
          this.posts.splice(index,1);
          console.log(respose);
        },
        (error) =>{
          this.errorMsg = error;
        });
  }

}
