# Brave Search MCP Server

An MCP Server implementation that integrates the [Brave Search API](https://brave.com/search/api/), providing, Web Search, Local Points of Interest Search, Video Search, Image Search and News Search capabilities

<a href="https://glama.ai/mcp/servers/@mikechao/brave-search-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@mikechao/brave-search-mcp/badge" alt="Brave Search MCP server" />
</a>

## Features

- **Web Search**: Perform a regular search on the web
- **Image Search**: Search the web for images. Image search results will be available as a Resource
- **News Search**: Search the web for news
- **Video Search**: Search the web for videos
- **Local Points of Interest Search**: Search for local physical locations, businesses, restaurants, services, etc

## Tools

- **brave_web_search**

  - Execute web searches using Brave's API
  - Inputs:
    - `query` (string): The term to search the internet for
    - `count` (number, optional): The number of results to return (max 20, default 10)
    - `offset` (number, optional, default 0): The offset for pagination
    - `freshness` (enum, optional): Filters search results by when they were discovered
      - The following values are supported
        - pd: Discovered within the last 24 hours.
        - pw: Discovered within the last 7 Days.
        - pm: Discovered within the last 31 Days.
        - py: Discovered within the last 365 Days
        - YYYY-MM-DDtoYYYY-MM-DD: Custom date range (e.g., 2022-04-01to2022-07-30)

- **brave_image_search**

  - Get images from the web relevant to the query
  - Inputs:
    - `query` (string): The term to search the internet for images of
    - `count` (number, optional): The number of images to return (max 3, default 1)

- **brave_news_search**

  - Searches the web for news
  - Inputs:
    - `query` (string): The term to search the internet for news articles, trending topics, or recent events
    - `count` (number, optional): The number of results to return (max 20, default 10)
    - `freshness` (enum, optional): Filters search results by when they were discovered
      - The following values are supported
        - pd: Discovered within the last 24 hours.
        - pw: Discovered within the last 7 Days.
        - pm: Discovered within the last 31 Days.
        - py: Discovered within the last 365 Days
        - YYYY-MM-DDtoYYYY-MM-DD: Custom date range (e.g., 2022-04-01to2022-07-30)

- **brave_local_search**

  - Search for local businesses, services and points of interest
  - **REQUIRES** subscription to the Pro api plan for location results
  - Falls back to brave_web_search if no location results are found
  - Inputs:
    - `query` (string): Local search term
    - `count` (number, optional): The number of results to return (max 20, default 5)

- **brave_video_search**

  - Search the web for videos
  - Inputs:
    - `query`: (string): The term to search for videos
    - `count`: (number, optional): The number of videos to return (max 20, default 10)
    - `freshness` (enum, optional): Filters search results by when they were discovered
      - The following values are supported
        - pd: Discovered within the last 24 hours.
        - pw: Discovered within the last 7 Days.
        - pm: Discovered within the last 31 Days.
        - py: Discovered within the last 365 Days
        - YYYY-MM-DDtoYYYY-MM-DD: Custom date range (e.g., 2022-04-01to2022-07-30)

## Configuration

### Getting an API Key

1. Sign up for a [Brave Search API account](https://brave.com/search/api/)
2. Choose a plan (Free tier available with 2,000 queries/month)
3. Generate your API key [from the developer dashboard](https://api.search.brave.com/app/keys)

### Usage with Claude Desktop

## Desktop Extension (DXT)

1. Download the `dxt` file from the [Releases](https://github.com/mikechao/brave-search-mcp/releases)
2. Open it with Claude Desktop
   or
   Go to File -> Settings -> Extensions and drag the .DXT file to the window to install it

## Docker

1. Clone the repo
2. Docker build

```bash
docker build -t brave-search-mcp:latest -f ./Dockerfile .
```

3. Add this to your `claude_desktop_config.json`:

```json
{
  "mcp-servers": {
    "brave-search": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "BRAVE_API_KEY",
        "brave-search-mcp"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR API KEY HERE"
      }
    }
  }
}
```

### NPX

Add this to your `claude_desktop_config.json`:

```json
{
  "mcp-servers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "brave-search-mcp"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR API KEY HERE"
      }
    }
  }
}
```

### Usage with LibreChat

Add this to librechat.yaml

```yaml
brave-search:
  command: sh
  args:
    - -c
    - BRAVE_API_KEY=API KEY npx -y brave-search-mcp
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Desktop Extensions (DXT)

Anthropic recently released [Desktop Extensions](https://github.com/anthropics/dxt) allowing installation of local MCP Servers with one click.

Install the CLI tool to help generate both `manifest.json` and final `.dxt` file.

```sh
npm install -g @anthropic-ai/dxt
```

### Creating the manifest.json file

1. In this folder/directory which contains the local MCP Server, run `dxt init`. The command will start an interactive CLI to help create the `manifest.json`.

### Creating the `dxt` file

1. First install dev dependencies and build

```sh
npm install
npm run build
```

2. Then install only the production dependencies, generate a smaller nodule_modules directory

```sh
npm install --omit=dev
```

3. Run `dxt pack` to create a `dxt` file. This will also validate the manifest.json that was created. The `dxt` is essentially a zip file and will contain everything in this directory.

## Disclaimer

This library is not officially associated with Brave Software. It is a third-party implementation of the Brave Search API with a MCP Server.

## Security

This project takes security seriously. We have implemented several security measures and best practices:

- Regular security scanning with Trunk
- Dependency management through UV package manager
- Secure secret management practices
- GPG-signed commits

For detailed security information, please see our [Security Documentation](docs/security.md).

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
