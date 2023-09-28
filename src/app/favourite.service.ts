import { Injectable } from '@angular/core';
import { FavouriteItem } from './favourite-item';
import { CategoryItem } from './category-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  async getAllFavourites(): Promise<FavouriteItem[]> {
    const data = fetch('https://localhost:7280/api/favorite/get');
    return (await data).json() ?? [];
  }
  async getAllCategories(): Promise<CategoryItem[]>{
    const data = fetch('https://localhost:7280/api/category/get');
    return (await data).json() ?? [];
    
  }
  addFavourite(favourite: FavouriteItem): void {
    const copyOfFavourite: FavouriteItem = { ...favourite };
    fetch('https://localhost:7280/api/favourite/add', {method: "POST", body: JSON.stringify(copyOfFavourite)});
  }
  async filterFavourites(categoryId: number): Promise<FavouriteItem[]>{
  const data = fetch (`https://localhost:7280/api/favorite/filter/`+categoryId);
  return (await data).json() ?? [];
}
async sortFavoritesByCategory(): Promise<FavouriteItem[]> {
  const data = fetch('https://localhost:7280/api/favorite/sortByCat');
  return (await data).json() ?? [];
}
async sortFavoritesByCategoryDesc(): Promise<FavouriteItem[]> {
  const data = fetch('https://localhost:7280/api/favorite/sortByCatDesc');
  return (await data).json() ?? [];
}
async sortFavoritesByDate(): Promise<FavouriteItem[]> {
  const data = fetch('https://localhost:7280/api/favorite/sortByDate');
  return (await data).json() ?? [];
}
async sortFavoritesByDateDesc(): Promise<FavouriteItem[]> {
  const data = fetch('https://localhost:7280/api/favorite/sortByDateDesc');
  return (await data).json() ?? [];
}

  constructor(
    private http: HttpClient
  ){}
}
