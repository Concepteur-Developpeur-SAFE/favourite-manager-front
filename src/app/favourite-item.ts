import { CategoryItem } from "./category-item";

export interface FavouriteItem {
    id: number,
    link: string,
    label: string,
    category: CategoryItem,
    updatedAt: string
}
export interface CreateFavouriteRequest{
    Link: string,
    Label: string,
    CategoryId: number
}
