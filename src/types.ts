export interface Nutrient {
  id: number;
  number: string;
  name: string;
  rank: number;
  unitName: string;
}

export interface FoodNutrient {
  type: string;
  nutrient: Nutrient;
  id?: number;
  amount?: number;
  dataPoints?: number;
  max?: number;
  min?: number;
  median?: number;
}

export interface FoodSearchResult {
  fdcId: number;
  description: string;
  dataType?: string;
  publishedDate?: string;
  brandOwner?: string;
  gtinUpc?: string;
  ingredients?: string;
  foodNutrients?: FoodNutrient[];
}

export interface FoodSearchResponse {
  foods: FoodSearchResult[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
}

export interface FoodDetailsResponse {
  fdcId: number;
  description: string;
  dataType?: string;
  publishedDate?: string;
  brandOwner?: string;
  gtinUpc?: string;
  ingredients?: string;
  foodNutrients?: FoodNutrient[];
}

export interface FoodListResponse {
  foods: FoodSearchResult[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
}