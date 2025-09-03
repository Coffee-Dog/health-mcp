import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchFoods, getFoodDetails, getFoodsList } from "./api-client.js";
import { formatFoodSearchResults, formatFoodDetails, formatFoodsList } from "./formatters.js";

export function registerHealthTools(server: McpServer) {
  server.tool(
    "search_foods",
    "Search for foods in the USDA FoodData Central database",
    {
      query: z.string().describe("Search query for food items"),
      pageSize: z.number().min(1).max(200).default(25).describe("Number of results per page (1-200)"),
      pageNumber: z.number().min(1).default(1).describe("Page number for pagination"),
      dataType: z.array(z.enum(["Branded", "SR Legacy", "Foundation", "Survey (FNDDS)"])).optional().describe("Filter by data type (optional)"),
    },
    async ({ query, pageSize = 25, pageNumber = 1, dataType }) => {
      const searchResults = await searchFoods(query, pageSize, pageNumber, dataType);

      if (!searchResults) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to search foods",
            },
          ],
        };
      }

      const foods = searchResults.foods || [];
      if (foods.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No foods found for query: "${query}"`,
            },
          ],
        };
      }

      const resultsText = formatFoodSearchResults(foods, query, searchResults.totalHits);

      return {
        content: [
          {
            type: "text",
            text: resultsText,
          },
        ],
      };
    }
  );

  server.tool(
    "get_food_details",
    "Get detailed nutrition information for a specific food by FDC ID",
    {
      fdcId: z.number().describe("FoodData Central ID of the food item"),
    },
    async ({ fdcId }) => {
      const foodDetails = await getFoodDetails(fdcId);

      if (!foodDetails) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to retrieve food details for FDC ID: ${fdcId}`,
            },
          ],
        };
      }

      const detailsText = formatFoodDetails(foodDetails);

      return {
        content: [
          {
            type: "text",
            text: detailsText,
          },
        ],
      };
    }
  );

  server.tool(
    "list_foods",
    "Get a paginated list of foods from the USDA database",
    {
      pageSize: z.number().min(1).max(200).default(25).describe("Number of results per page (1-200)"),
      pageNumber: z.number().min(1).default(1).describe("Page number for pagination"),
    },
    async ({ pageSize = 25, pageNumber = 1 }) => {
      const foodsList = await getFoodsList(pageSize, pageNumber);

      if (!foodsList) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve foods list",
            },
          ],
        };
      }

      const foods = foodsList.foods || [];
      if (foods.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No foods found in the database",
            },
          ],
        };
      }

      const listText = formatFoodsList(foods, foodsList.totalHits);

      return {
        content: [
          {
            type: "text",
            text: listText,
          },
        ],
      };
    }
  );
}