import { Component, EventEmitter, inject, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItem } from '../category-item';
import { FavouriteItem } from '../favourite-item';
import { FavouriteService } from '../favourite.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent {
  @Output() setFilterEvent = new EventEmitter<number>();
  setFilterFav(id: number) {
    this.setFilterEvent.emit(id);
  }
  categoryFilter : number = 0;
  categories: CategoryItem[] = [];
  favouriteList: FavouriteItem[] = [];
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.favouriteService.getAllCategories().then((catList:CategoryItem[])=>{
      this.categories = catList;
    }
    );
    this.favouriteService.getAllFavourites().then((favList:FavouriteItem[])=>{
      this.favouriteList = favList;
    }
    );
  }
  @Output() setModeEvent = new EventEmitter<string>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }

  filterFavorites(categoryId: number): void {
    console.log(categoryId);
    if (categoryId !== 0) {
      this.setFilterEvent.emit(categoryId);
  }
}
}
