import { Injectable } from '@angular/core';
import { FavouriteItem } from './favourite-item';
import { CategoryItem } from './category-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  async getAllFavourites(): Promise<FavouriteItem[]> {
    const data = fetch('http://127.0.0.1:8080/favourite/get');
    return (await data).json() ?? [];
  }
  async getAllCategories(): Promise<CategoryItem[]>{
    const data = fetch('http://127.0.0.1:8080/category/get');
    return (await data).json() ?? [];
    
  }
  addFavourite(favourite: FavouriteItem): void {
    const copyOfFavourite: FavouriteItem = { ...favourite };
    fetch('http://127.0.0.1:8080/favourite/add', {method: "POST", body: JSON.stringify(copyOfFavourite)});
  }

  constructor(
    private http: HttpClient
  ){}
}
