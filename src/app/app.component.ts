import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavoriteChangeEventArgs } from './favorite/favorite.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  post={
    title:"Rafik Mondal",
    isFavorite:true
  }
  evnName = environment.name;
  
}
