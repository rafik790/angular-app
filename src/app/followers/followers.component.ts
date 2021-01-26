import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from '../services/followers.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers:any[]
  constructor(
    private router:ActivatedRoute,
    private service:FollowersService) { 
      this.followers =[];
    }

  ngOnInit(): void {
    let pageNumber = this.router.snapshot.queryParamMap.get("page");
    let order = this.router.snapshot.queryParamMap.get("order");
    console.log("page::"+pageNumber+" ,order::"+order);

    this.service.getFollowers()
      .subscribe(data=>{
        this.followers = (data as [])
      },error=>{

      });
  }

}
