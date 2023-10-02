import { Injectable } from "@angular/core";
import { CategoryItem } from "./category-item";
import { FavouriteItem } from "./favourite-item";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})

// The FavouriteService is responsible for communicating with the backend server
export class FavouriteService {
  constructor(private http: HttpClient) {}

  /* FAVOURITES */
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

  async sortFavoritesByCategory(): Promise<FavouriteItem[]> {
    const data = fetch("https://localhost:7280/api/favorite/sortByCat");
    return (await data).json() ?? [];
  }

  async sortFavoritesByCategoryDesc(): Promise<FavouriteItem[]> {
    const data = fetch("https://localhost:7280/api/favorite/sortByCatDesc");
    return (await data).json() ?? [];
  }

  async sortFavoritesByDate(): Promise<FavouriteItem[]> {
    const data = fetch("https://localhost:7280/api/favorite/sortByDate");
    return (await data).json() ?? [];
  }

  async sortFavoritesByDateDesc(): Promise<FavouriteItem[]> {
    const data = fetch("https://localhost:7280/api/favorite/sortByDateDesc");
    return (await data).json() ?? [];
  }

  async addFavourite(favourite: FavouriteItem): Promise<any> {
    var myHeaders = new Headers();

    // POST request body
    var raw = JSON.stringify({
      label: favourite.label,
      link: favourite.link,
      categoryId: favourite.category.id,
    });

    // Add headers for body data type
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        "https://localhost:7280/api/favorite/create",
        requestOptions
      );
      const statusCode = response.status;
      return statusCode;
    } catch (error) {
      console.error("Error:", error);
      return 500;
    }
  }

  /* CATEGORIES */
  async getAllCategories(): Promise<CategoryItem[]> {
    const data = fetch("https://localhost:7280/api/category/get");
    return (await data).json() ?? [];
  }
}
