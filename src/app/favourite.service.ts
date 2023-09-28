import { Injectable } from "@angular/core";
import { FavouriteItem } from "./favourite-item";
import { CategoryItem } from "./category-item";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FavouriteService {
  constructor(private http: HttpClient) {}

  /* FAVOURITES */

  addFavourite(favourite: FavouriteItem): void {
    const copyOfFavourite: FavouriteItem = { ...favourite };
    fetch("https://localhost:7280/api/favourite/add", {
      method: "POST",
      body: JSON.stringify(copyOfFavourite),
    });
  }

  async getAllFavourites(): Promise<FavouriteItem[]> {
    const data = fetch("https://localhost:7280/api/favorite/get");
    return (await data).json() ?? [];
  }

  async deleteFavorite(ids: number[]): Promise<void> {
    const url = "https://localhost:7280/api/favorite/delete";

    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(ids),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete favorites: ${response.statusText}`);
    }
  }

  async filterFavourites(categoryId: number): Promise<FavouriteItem[]> {
    const data = fetch(
      `https://localhost:7280/api/favorite/filter/` + categoryId
    );
    return (await data).json() ?? [];
  }

  /* CATEGORIES */

  async getAllCategories(): Promise<CategoryItem[]> {
    const data = fetch("https://localhost:7280/api/category/get");
    return (await data).json() ?? [];
  }
}
