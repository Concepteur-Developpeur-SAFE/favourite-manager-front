import { Component, EventEmitter, inject, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItem } from '../category-item';
import { FavouriteService } from '../favourite.service';

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css']
})
export class ViewModeComponent {
  categories: CategoryItem[] = [];
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.favouriteService.getAllCategories().then((catList:CategoryItem[])=>{
      this.categories = catList;
    }
    );
  }
  @Output() setModeEvent = new EventEmitter<string>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }
}
