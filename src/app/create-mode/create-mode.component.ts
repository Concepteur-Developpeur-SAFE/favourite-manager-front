import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteItem } from '../favourite-item';
import { CategoryItem } from '../category-item';
import { FavouriteService } from '../favourite.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// CommonJS
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
      label: ''
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
    this.favouriteService.addFavourite(this.favorite).then(
      (response) => {
        if(response==200)
        {
          Swal.fire(
            {
              title: 'Success',
              text: 'A favourite was added successfully',
              icon: 'success'
            }
          )
          this.setMode('view');
          this.favorite = this.DEFAULT_FAVOURITE;
        }
        else
        {
          Swal.fire(
            {
              title: 'Error',
              text: 'Link already exists',
              icon: 'error'
            }
          )
        }
        
      }
      ).catch(
        (error) => Swal.fire(
          {
            title: 'Error',
            text: 'Error while adding the favourite',
            icon: 'error'
          }
        )
      )
    
  }
  
  cancel(){
    this.setMode('view');
    this.favorite = this.DEFAULT_FAVOURITE;
  }
}
