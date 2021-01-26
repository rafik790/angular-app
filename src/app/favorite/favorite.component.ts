import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input("is-favorite") isFavorite:boolean;
  @Output("on-change") change = new EventEmitter();
  constructor() { 
    this.isFavorite = false;
  }

  ngOnInit(): void {
  }

  onClick(){
    this.isFavorite = !this.isFavorite;
    this.change.emit({newStatus:this.isFavorite});
  }

}

export interface FavoriteChangeEventArgs{
  newStatus:boolean
}
