FROM node:22-slim AS base
RUN corepack enable
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/domain/package.json ./packages/domain/
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /app/packages/domain/node_modules ./packages/domain/node_modules
COPY . .
RUN pnpm run build --filter=api
# Generate Prisma client after install + build
RUN cd apps/api && npx prisma generate

# Production
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/packages/domain ./packages/domain
COPY --from=builder /app/package.json ./package-root.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN corepack enable && pnpm install --frozen-lockfile --prod
EXPOSE 3333
CMD ["node", "dist/server.js"]
