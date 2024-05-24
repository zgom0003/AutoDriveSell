import { ProductImages } from "./product-images";
import { ProductOption } from "./product-options";
import { Review } from "./review";

export interface CatalogRetrieve {
  id: number;
  name: string;
  description: string;
  images: ProductImages[];
  productOptions: ProductOption[];
  reviews: Review[];
}
