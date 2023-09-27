import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteItem } from '../favourite-item';
import { CategoryItem } from '../category-item';
import { FavouriteService } from '../favourite.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-mode',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-mode.component.html',
  styleUrls: ['./create-mode.component.css']
})
export class CreateModeComponent {

  DEFAULT_FAVOURITE: FavouriteItem = {
    id: 0,
    link: '',
    label: '',
    category: {
      id: 0,
      name: ''
    },
    updatedAt: ''
  };

  @Input() favorite: FavouriteItem = this.DEFAULT_FAVOURITE;

  categories: CategoryItem[] = [];

  @Output() setModeEvent = new EventEmitter<string>();

  favouriteService: FavouriteService = inject(FavouriteService);

  constructor() {
    this.favouriteService.getAllCategories().then((catList:CategoryItem[])=>{
      this.categories = catList;
    }
    );
  }

  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }

  validate(){
    this.favouriteService.addFavourite(this.favorite);
    this.setMode('view');
    this.favorite = this.DEFAULT_FAVOURITE;
  }
  
  cancel(){
    this.setMode('view');
    this.favorite = this.DEFAULT_FAVOURITE;
  }
}
