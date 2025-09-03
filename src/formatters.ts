import { FoodSearchResult, FoodDetailsResponse, FoodNutrient } from "./types.js";

export function formatNutrient(foodNutrient: FoodNutrient): string {
  const name = foodNutrient.nutrient?.name || `Nutrient ${foodNutrient.nutrient?.number || "Unknown"}`;
  const value = foodNutrient.amount !== undefined && foodNutrient.amount !== null ? 
    Number(foodNutrient.amount).toFixed(2) : "N/A";
  const unit = foodNutrient.nutrient?.unitName || "";
  return `${name}: ${value} ${unit}`.trim();
}

export function formatFoodSearchResult(food: FoodSearchResult): string {
  // Filter out nutrients with no meaningful data
  const validNutrients = food.foodNutrients?.filter(n => 
    n.nutrient?.name && 
    n.amount !== undefined && 
    n.amount !== null && 
    n.amount !== 0
  ).slice(0, 5) || [];
  
  const nutrients = validNutrients.map(formatNutrient);
  const nutrientInfo = nutrients.length > 0 ? `\nTop Nutrients:\n${nutrients.join("\n")}` : "";
  
  return [
    `FDC ID: ${food.fdcId}`,
    `Description: ${food.description}`,
    `Data Type: ${food.dataType || "Unknown"}`,
    food.brandOwner ? `Brand: ${food.brandOwner}` : "",
    food.gtinUpc ? `UPC: ${food.gtinUpc}` : "",
    nutrientInfo,
    "---",
  ].filter(line => line !== "").join("\n");
}

export function formatFoodDetails(food: FoodDetailsResponse): string {
  // Filter out nutrients with no meaningful data and sort by amount
  const validNutrients = food.foodNutrients?.filter(n => 
    n.nutrient?.name && 
    n.amount !== undefined && 
    n.amount !== null && 
    n.amount !== 0
  ).sort((a, b) => (b.amount || 0) - (a.amount || 0)) || [];
  
  const nutrients = validNutrients.map(formatNutrient);
  const nutrientInfo = nutrients.length > 0 ? `\nNutrients:\n${nutrients.join("\n")}` : "";
  
  return [
    `FDC ID: ${food.fdcId}`,
    `Description: ${food.description}`,
    `Data Type: ${food.dataType || "Unknown"}`,
    food.publishedDate ? `Published: ${food.publishedDate}` : "",
    food.brandOwner ? `Brand: ${food.brandOwner}` : "",
    food.gtinUpc ? `UPC: ${food.gtinUpc}` : "",
    food.ingredients ? `Ingredients: ${food.ingredients}` : "",
    nutrientInfo,
  ].filter(line => line !== "").join("\n");
}

export function formatFoodSearchResults(foods: FoodSearchResult[], query: string, totalHits: number): string {
  const formattedFoods = foods.map(formatFoodSearchResult);
  return `Search results for "${query}" (${totalHits} total hits):\n\n${formattedFoods.join("\n")}`;
}

export function formatFoodsList(foods: FoodSearchResult[], totalHits: number): string {
  const formattedFoods = foods.map(formatFoodSearchResult);
  return `Food list (${totalHits} total items):\n\n${formattedFoods.join("\n")}`;
}