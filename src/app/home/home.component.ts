import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModeComponent } from '../view-mode/view-mode.component';
import { CreateModeComponent } from '../create-mode/create-mode.component';
import { FavouriteListComponent } from '../favourite-list/favourite-list.component';
import { FavouriteItem } from '../favourite-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ViewModeComponent,
    CreateModeComponent,
    FavouriteListComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  _mode : string = "view";
  public set mode(newMode: string) {
    this._mode = newMode;
  }
  public get mode(){
    return this._mode;
  }
  public setMode(newMode: string) {
    this._mode = newMode;
  }
  DEFAULT_FAVOURITE: FavouriteItem = {
    id: 0,
    link: '',
    label: '',
    category: {
      id: 0,
      label: ''
    },
    updatedAt: ''
  };
  currentFavorite: FavouriteItem = this.DEFAULT_FAVOURITE;
  updateCurrentFavourite(favourite: FavouriteItem){
    this.currentFavorite = favourite;
    console.log(this.currentFavorite);
  }
}
