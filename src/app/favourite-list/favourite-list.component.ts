import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteService } from '../favourite.service';
import { FavouriteItem } from '../favourite-item';
import { CategoryItem } from '../category-item';
import { FavouriteItemComponent } from '../favourite-item/favourite-item.component';

@Component({
  selector: 'app-favourite-list',
  standalone: true,
  imports: [
    CommonModule,
    FavouriteItemComponent
  ],
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent {
  checked: boolean[] = new Array(100).fill(false);
  favouriteList: FavouriteItem[] = [];
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.refresh();

  }
  @Output() setModeEvent = new EventEmitter<string>();
  @Output() updateCurrentFavouriteEvent = new EventEmitter<FavouriteItem>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }
  updateCurrentFavourite(favourite:FavouriteItem){
    this.updateCurrentFavouriteEvent.emit(favourite);
  }
  update(favourite:FavouriteItem){
    this.setMode('create');
    this.updateCurrentFavourite(favourite);
  }
  refresh()
  {
    this.favouriteService.getAllFavourites().then((favList:FavouriteItem[])=>{
      this.favouriteList = favList;
    }
    );
  }
}
