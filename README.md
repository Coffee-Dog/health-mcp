# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information using the National Weather Service API.

## Features

- **Weather Alerts**: Get active weather alerts for any US state
- **Weather Forecasts**: Get detailed weather forecasts for any location (latitude/longitude)
- **Clean Architecture**: Modular codebase with separation of concerns

## Tools

### `get_alerts`
Get weather alerts for a US state.

**Parameters:**
- `state` (string): Two-letter state code (e.g., "CA", "NY")

**Example:**
```json
{
  "state": "CA"
}
```

### `get_forecast`
Get weather forecast for a specific location.

**Parameters:**
- `latitude` (number): Latitude of the location (-90 to 90)
- `longitude` (number): Longitude of the location (-180 to 180)

**Example:**
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194
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
├── api-client.ts   # NWS API client
├── formatters.ts   # Data formatting utilities
└── tools.ts        # MCP tool definitions
```

### Building

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `build/` directory and makes the main file executable.

## Usage with MCP Client

Add this server to your MCP client configuration:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/weather/build/index.js"]
    }
  }
}
```

## API Data Source

This server uses the National Weather Service (NWS) API, which provides weather data for locations within the United States. The API is free and does not require authentication.

## License

ISC