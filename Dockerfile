# syntax=docker/dockerfile:1
# Boxquell website: Vite build, then static files served by Caddy.
#
#   docker buildx build -t boxquell-www .
#   docker run --rm -p 8080:80 boxquell-www
FROM --platform=$BUILDPLATFORM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_DOMAIN=boxquell.app
ENV VITE_SITE_DOMAIN=$SITE_DOMAIN
# The catalogue pages come from src/data/catalogue.json, which is committed; `npm run catalogue` renews it.
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget -qO- http://localhost/ >/dev/null || exit 1
