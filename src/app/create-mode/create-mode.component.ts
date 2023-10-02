import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CategoryItem } from "../category-item";
import { FavouriteItem } from "../favourite-item";
import { FavouriteService } from "../favourite.service";
import { Component, EventEmitter, Output, inject, Input } from "@angular/core";

// CommonJS
@Component({
  selector: "app-create-mode",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./create-mode.component.html",
  styleUrls: ["./create-mode.component.css"],
})
export class CreateModeComponent {
  // Default favourite item value
  DEFAULT_FAVOURITE: FavouriteItem = {
    id: 0,
    link: "",
    label: "",
    category: {
      id: 0,
      label: "",
    },
    updatedAt: "",
  };

  // Service Dependency injection
  favouriteService: FavouriteService = inject(FavouriteService);
  constructor() {
    this.favouriteService
      .getAllCategories()
      .then((catList: CategoryItem[]) => (this.categories = catList));
  }

  // Current favourite in the creation form
  @Input() favorite: FavouriteItem = this.DEFAULT_FAVOURITE;

  categories: CategoryItem[] = [];

  // Set display mode in home component (creation/view)
  @Output() setModeEvent = new EventEmitter<string>();
  setMode(mode: string) {
    this.setModeEvent.emit(mode);
  }

  // Add the favourite with the entered data
  validate() {
    this.favouriteService
      .addFavourite(this.favorite)
      .then((response) => {
        if (response == 200) {
          Swal.fire({
            title: "Success",
            text: "A favourite was added successfully",
            icon: "success",
          });
          this.setMode("view");
          this.favorite = this.DEFAULT_FAVOURITE;
        } else {
          Swal.fire({
            title: "Error",
            text: "Link already exists",
            icon: "error",
          });
        }
      })
      .catch((error) =>
        Swal.fire({
          title: "Error",
          text: "Error while adding the favourite",
          icon: "error",
        })
      );
  }

  // Cancel the creation form
  cancel() {
    this.setMode("view");
    this.favorite = this.DEFAULT_FAVOURITE;
  }
}