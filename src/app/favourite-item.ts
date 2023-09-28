import { CategoryItem } from "./category-item";

export interface FavouriteItem {
    id: number,
    link: string,
    label: string,
    category: CategoryItem,
    updatedAt: string
}
