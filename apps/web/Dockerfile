FROM node:18-alpine3.17 AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@acme/web --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
RUN yarn global add pnpm turbo

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm i
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
ARG DATABASE_URL
RUN DATABASE_URL=${DATABASE_URL} pnpm run db:generate
RUN SKIP_ENV_VALIDATION=1 turbo run build --filter=@acme/web...

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000
 
CMD node apps/web/server.js
