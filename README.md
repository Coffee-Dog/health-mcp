# Health MCP Server

A Model Context Protocol (MCP) server that provides nutrition and food information using the USDA FoodData Central API.

## Features

- **Food Search**: Search for foods in the USDA FoodData Central database
- **Food Details**: Get detailed nutrition information for specific foods
- **Food Lists**: Browse paginated lists of foods from the database
- **Clean Architecture**: Modular codebase with separation of concerns

## Tools

### `search_foods`
Search for foods in the USDA FoodData Central database.

**Parameters:**
- `query` (string): Search query for food items
- `pageSize` (number, optional): Number of results per page (1-200, default: 25)
- `pageNumber` (number, optional): Page number for pagination (default: 1)
- `dataType` (array, optional): Filter by data type ["Branded", "SR Legacy", "Foundation", "Survey (FNDDS)"]

**Example:**
```json
{
  "query": "cheddar cheese",
  "pageSize": 10,
  "pageNumber": 1,
  "dataType": ["Branded"]
}
```

### `get_food_details`
Get detailed nutrition information for a specific food by FDC ID.

**Parameters:**
- `fdcId` (number): FoodData Central ID of the food item

**Example:**
```json
{
  "fdcId": 173410
}
```

### `list_foods`
Get a paginated list of foods from the USDA database.

**Parameters:**
- `pageSize` (number, optional): Number of results per page (1-200, default: 25)
- `pageNumber` (number, optional): Page number for pagination (default: 1)

**Example:**
```json
{
  "pageSize": 50,
  "pageNumber": 2
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Development

This project is built with TypeScript and follows the [MCP Node.js quickstart guide](https://modelcontextprotocol.io/quickstart/server#node).

### Project Structure

```
src/
├── index.ts        # Main server entry point
├── types.ts        # TypeScript interfaces and types
├── api-client.ts   # USDA FoodData Central API client
├── formatters.ts   # Data formatting utilities
└── tools.ts        # MCP tool definitions
```

### Building

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `build/` directory and makes the main file executable.

## Setup with Claude Desktop

To use this weather server with Claude Desktop:

1. **Build the server** (if not already done):
   ```bash
   npm run build
   ```

2. **Find your Claude Desktop configuration file**:
   - **macOS/Linux**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

   You can open it directly with:
   ```bash
   # macOS/Linux
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Add the health server to your configuration**:
   ```json
   {
     "mcpServers": {
       "health": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/health-mcp/build/index.js"]
       }
     }
   }
   ```

   Replace `/ABSOLUTE/PATH/TO/PARENT/FOLDER/health-mcp` with the actual absolute path to your health-mcp project directory.

4. **Save the configuration file and restart Claude Desktop**.

The MCP UI elements will only show up in Claude Desktop if at least one server is properly configured.

## API Data Source

This server uses the USDA FoodData Central API, which provides comprehensive nutrition data for foods. The API requires a data.gov API key for access.

### Data Types Available:
- **Branded**: Commercial food products with UPC codes
- **SR Legacy**: Standard Reference Legacy database
- **Foundation**: Foundation Foods providing nutrient data
- **Survey (FNDDS)**: Food and Nutrient Database for Dietary Studies

### Rate Limits
The API has a default rate limit of 1,000 requests per hour per IP address.

## License

ISC