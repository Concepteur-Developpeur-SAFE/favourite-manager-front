import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
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
      this.favouriteService.getAllFavourites().then((favList: FavouriteItem[]) => {
        this.favouriteList = favList;
      }
      );
    
  }
  @Output() setModeEvent = new EventEmitter<string>();
  @Output() updateCurrentFavouriteEvent = new EventEmitter<FavouriteItem>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }
  @Input() 
  get filterByCategory (): number { 
    return this._filterByCategory;
  }
  set filterByCategory(value: number) {
    this._filterByCategory = value;
    console.log(this.filterByCategory);
    if (this.filterByCategory !== 0) {
      this.favouriteService.filterFavourites(this.filterByCategory).then((favList: FavouriteItem[]) => {
        this.favouriteList = favList;
      });
    }
    if (this.filterByCategory == 0) {
      this.favouriteService.getAllFavourites().then((favList: FavouriteItem[]) => {
        this.favouriteList = favList;
      });
    }
  }
  private _filterByCategory = 0;

  updateCurrentFavourite(favourite: FavouriteItem) {
    
    this.updateCurrentFavouriteEvent.emit(favourite);
  }
  update(favourite: FavouriteItem) {
    this.setMode('create');
    this.updateCurrentFavourite(favourite);
  }
  sortByCat() {
    this.favouriteService.sortFavoritesByCategory().then((favList: FavouriteItem[]) => {
      this.favouriteList = favList;
    });
  }
  sortByCatDesc(){
    this.favouriteService.sortFavoritesByCategoryDesc().then((favList: FavouriteItem[]) => {
      this.favouriteList = favList;
    });
  }
  sortByDate(){
    this.favouriteService.sortFavoritesByDate().then((favList: FavouriteItem[]) => {
      this.favouriteList = favList;
    });
  }
  sortByDateDesc(){
    this.favouriteService.sortFavoritesByDateDesc().then((favList: FavouriteItem[]) => {
      this.favouriteList = favList;
    });
  }
}
