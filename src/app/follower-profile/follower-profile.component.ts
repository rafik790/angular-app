import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-follower-profile',
  templateUrl: './follower-profile.component.html',
  styleUrls: ['./follower-profile.component.css']
})

export class FollowerProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router) {
    
   }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    console.log("Iside Follower Profile::"+id);

    this.route.paramMap
      .subscribe(params=>{
        let id = params.get("id");
        let username = params.get("username");
        console.log("id::"+id+",username::"+username);
      });
  }

  submit(){
    this.router.navigate(['/followers'],{
      queryParams:{page:1,order:'newest'}
    });

  }

}
