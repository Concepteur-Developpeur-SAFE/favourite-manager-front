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
  

  // Checkbox state for each favourite
  checked: boolean[] = new Array(200).fill(false);
  masterCheckboxChecked: boolean = false;

  // Favourites to display
  favouriteList: FavouriteItem[] = [];

  // Service dependency injection
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.refresh();
  }

  // Change display mode (creation/view)
  @Output() setModeEvent = new EventEmitter<string>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }


  // Send updated favourite data to home component 
  @Output() updateCurrentFavouriteEvent = new EventEmitter<FavouriteItem>();
  updateCurrentFavourite(favourite: FavouriteItem) {
    this.updateCurrentFavouriteEvent.emit(favourite);
  }
  update(favourite: FavouriteItem) {
    this.setMode("create");
    this.updateCurrentFavourite(favourite);
  }
  

  // Input from home component to filter the list
  private _filterByCategory = 0;
  @Input()
  get filterByCategory(): number {
    return this._filterByCategory;
  }
  // Detect value change
  set filterByCategory(value: number) {
    this._filterByCategory = value;
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
  
  // Deletion of the selected favourites
  idsToDelete: number[] = [];
  toggleAllCheckboxes() {
    for(let fav of this.favouriteList)
    {
      this.checked[fav.id] = this.masterCheckboxChecked;
      this.updateSelection(fav.id);
    }
  }
  updateSelection(id: number)
  {
    if(this.checked[id])
    {
      if(!this.idsToDelete.includes(id))
          this.idsToDelete.push(id);
    }  
    else
      this.idsToDelete.splice(this.idsToDelete.indexOf(id), 1);
  }
  checkMasterCheckbox(id: number) {  
    this.updateSelection(id);
    const checkedCount = Object.values(this.checked).filter(
      (value) => value
    ).length;
    this.masterCheckboxChecked = checkedCount === this.favouriteList.length;
  }
  deleteFavorite() {
    for(let id of this.idsToDelete)
      this.checked[id] = false;
    this.favouriteService.deleteFavorite(this.idsToDelete).then(
      (response) => this.refresh()
    );
  }

  // Refresh the favourite list
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
