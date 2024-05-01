# STAGE: Development
FROM public.ecr.aws/docker/library/node:16.16-alpine AS dev
WORKDIR /app
COPY . /app/
RUN npm i

# STAGE: Builder
FROM public.ecr.aws/docker/library/node:16.16-alpine AS builder
WORKDIR /app
COPY --from=dev /app /app
RUN npm run build

# STAGE: Prod Dependencies Builder
FROM public.ecr.aws/docker/library/node:16.16-alpine AS prod-dependencies
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i

# STAGE: Prod Deploy Ready Image
FROM public.ecr.aws/docker/library/node:16.16-alpine AS prod
EXPOSE 8080
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
CMD ["node", "dist/index.js"]
