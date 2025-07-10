FROM node:23.11-alpine AS builder

LABEL maintainer="tz-dev@vectorweight.com"
LABEL org.opencontainers.image.source="https://github.com/tzervas/brave-search-mcp"
LABEL org.opencontainers.image.description="Brave Search MCP with enhanced security"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/node_modules \
    npm ci

COPY . .

RUN npm run build

FROM node:23.11-alpine AS release

WORKDIR /app

COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/package*.json /app/

ENV NODE_ENV=production

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts && \
    chown -R appuser:appgroup /app

USER appuser

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e 'try { require("http").get("http://localhost:${PORT}/health", (r) => process.exit(r.statusCode === 200 ? 0 : 1)); } catch(e) { process.exit(1); }'

ENTRYPOINT ["node", "dist/index.js"]
