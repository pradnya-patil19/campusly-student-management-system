FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY sequelize.config.cjs .sequelizerc ./
COPY src/migrations ./src/migrations
EXPOSE 3000
CMD ["node", "dist/server.js"]
