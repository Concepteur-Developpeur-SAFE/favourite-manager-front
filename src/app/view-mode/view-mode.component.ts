import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CategoryItem } from "../category-item";
import { FavouriteItem } from "../favourite-item";
import { FavouriteService } from "../favourite.service";
import { Component, EventEmitter, inject, Output } from "@angular/core";

@Component({
  selector: "app-view-mode",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./view-mode.component.html",
  styleUrls: ["./view-mode.component.css"],
})
export class ViewModeComponent {
  // Category id to filter the favourites
  categoryFilter: number = 0;
  // List of categories and favourites to display
  categories: CategoryItem[] = [];
  favouriteList: FavouriteItem[] = [];

  // Service dependency injection
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.favouriteService
      .getAllCategories()
      .then((catList: CategoryItem[]) => (this.categories = catList));
    this.favouriteService
      .getAllFavourites()
      .then((favList: FavouriteItem[]) => (this.favouriteList = favList));
  }
  // Tell the home component to set the category filter id
  @Output() setFilterEvent = new EventEmitter<number>();
  filterFavorites(categoryId: number): void {
    if (categoryId !== 0) {
      this.setFilterEvent.emit(categoryId);
    }
  }

  // Tell the home component to set mode (view/creation)
  @Output() setModeEvent = new EventEmitter<string>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }
}
