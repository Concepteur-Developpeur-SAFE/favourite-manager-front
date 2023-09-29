import { Component, inject, Output, EventEmitter, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavouriteService } from "../favourite.service";
import { FavouriteItem } from "../favourite-item";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-favourite-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./favourite-list.component.html",
  styleUrls: ["./favourite-list.component.css"],
})
export class FavouriteListComponent {
  
  checked: boolean[] = new Array(100).fill(false);
  favouriteList: FavouriteItem[] = [];
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.refresh();
  }

  favouriteList: FavouriteItem[] = [];
  favouriteService: FavouriteService = inject(FavouriteService);

  private _filterByCategory = 0;
  masterCheckboxChecked: boolean = false;
  checked: boolean[] = new Array(100).fill(false);

  @Output() setModeEvent = new EventEmitter<string>();
  @Output() updateCurrentFavouriteEvent = new EventEmitter<FavouriteItem>();
  @Input()
  get filterByCategory(): number {
    return this._filterByCategory;
  }
  set filterByCategory(value: number) {
    this._filterByCategory = value;
    console.log(this.filterByCategory);
    if (this.filterByCategory !== 0) {
      this.favouriteService
        .filterFavourites(this.filterByCategory)
        .then((favList: FavouriteItem[]) => {
          this.favouriteList = favList;
        });
    }
    if (this.filterByCategory == 0) {
      this.favouriteService
        .getAllFavourites()
        .then((favList: FavouriteItem[]) => {
          this.favouriteList = favList;
        });
    }
  }

  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }

  updateCurrentFavourite(favourite: FavouriteItem) {
    this.updateCurrentFavouriteEvent.emit(favourite);
  }

  update(favourite: FavouriteItem) {
    this.setMode("create");
    this.updateCurrentFavourite(favourite);
  }


  toggleAllCheckboxes() {
    for (const item of this.favouriteList) {
      this.checked[item.id] = this.masterCheckboxChecked;
    }
  }

  checkMasterCheckbox() {
    const checkedCount = Object.values(this.checked).filter(
      (value) => value
    ).length;
    this.masterCheckboxChecked = checkedCount === this.favouriteList.length;
  }

  deleteFavorite() {
    let idsToDelete = [];
    for (const item of this.favouriteList) {
      if (this.checked[item.id]) {
        idsToDelete.push(item.id);
      }
    }
    this.favouriteService.deleteFavorite(idsToDelete);
  }
  refresh()
  {
    this.favouriteService.getAllFavourites().then((favList:FavouriteItem[])=>{
      this.favouriteList = favList;
    }
    );
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
