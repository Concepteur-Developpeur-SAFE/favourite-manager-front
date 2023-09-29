import { Injectable } from '@angular/core';
import { FavouriteItem, CreateFavouriteRequest} from './favourite-item';
import { CategoryItem } from './category-item';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
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
  async addFavourite(favourite: FavouriteItem): Promise<any> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "label": "label",
      "link": favourite.link,
      "categoryId": favourite.category.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    try {
        const response = await fetch("https://localhost:7280/api/favorite/create", requestOptions);
        const statusCode = response.status;
        return statusCode;
    } catch (error) {
        console.error("Error:", error);
        return 500;
    }
  }
  constructor(
    private http: HttpClient
  ){}
}
