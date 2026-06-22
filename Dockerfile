FROM node:18-alpine AS base

# --- Server Stage ---
FROM base AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production

FROM base AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npm run build

# --- Client Stage ---
FROM node:18-alpine AS client-deps
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci

FROM client-deps AS client-build
WORKDIR /app/client
COPY client/ ./
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine AS production
WORKDIR /app

COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY --from=server-build /app/server ./server
COPY --from=client-build /app/client/build ./client/build

WORKDIR /app/server
EXPOSE 5000

CMD ["node", "src/index.js"]
