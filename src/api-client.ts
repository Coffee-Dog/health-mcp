import { FoodSearchResponse, FoodDetailsResponse, FoodListResponse } from "./types.js";

export const USDA_API_BASE = "https://api.nal.usda.gov/fdc/v1";
export const API_KEY = "BBpVsQySug2H4pdGf5MdSbKtKeWTFdSu72maHpD4";
export const USER_AGENT = "health-mcp/1.0";

export async function makeUSDARequest<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
  const url = new URL(`${USDA_API_BASE}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const headers = {
    "User-Agent": USER_AGENT,
    "Accept": "application/json",
  };

  try {
    const response = await fetch(url.toString(), { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making USDA request:", error);
    return null;
  }
}

export async function makeUSDAPostRequest<T>(endpoint: string, body: Record<string, any>): Promise<T | null> {
  const url = new URL(`${USDA_API_BASE}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);

  const headers = {
    "User-Agent": USER_AGENT,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making USDA POST request:", error);
    return null;
  }
}

export async function searchFoods(query: string, pageSize: number = 25, pageNumber: number = 1, dataType?: string[]): Promise<FoodSearchResponse | null> {
  const body: Record<string, any> = {
    query,
    pageSize,
    pageNumber,
  };

  if (dataType) {
    body.dataType = dataType;
  }

  return makeUSDAPostRequest<FoodSearchResponse>("/foods/search", body);
}

export async function getFoodDetails(fdcId: number): Promise<FoodDetailsResponse | null> {
  return makeUSDARequest<FoodDetailsResponse>(`/food/${fdcId}`);
}

export async function getFoodsList(pageSize: number = 25, pageNumber: number = 1): Promise<FoodListResponse | null> {
  const body = {
    pageSize,
    pageNumber,
  };

  return makeUSDAPostRequest<FoodListResponse>("/foods/list", body);
}