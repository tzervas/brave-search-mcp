FROM node:23.11-alpine AS builder

LABEL maintainer="tz-dev@vectorweight.com"
LABEL org.opencontainers.image.source="https://github.com/tzervas/brave-search-mcp"
LABEL org.opencontainers.image.description="Brave Search MCP with enhanced security"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --cache /root/.npm --prefer-offline && \
    npm cache clean --force && \
    rm -rf /root/.npm/* && \
    find /app -type f -name "*.map" -delete

COPY . .

RUN npm run build

FROM node:23.11-alpine AS release

WORKDIR /app

COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/package*.json /app/

ENV NODE_ENV=production

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app && \
    find /app -type f -name "*.map" -delete

USER appuser

COPY health.js /app/health.js

ENV PORT=3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node /app/health.js || exit 1

ENTRYPOINT ["node", "dist/index.js"]
