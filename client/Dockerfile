# Development Stage
FROM node:21-alpine3.18  AS development

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4200

CMD ["yarn", "start"]

# Build Stage
FROM node:21-alpine3.18 AS build

WORKDIR /usr/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the application dependencies
RUN yarn install

# Copy the application files
COPY . .

# Build the Angular app
RUN yarn build

# Production Stage
FROM nginx:alpine AS production

WORKDIR /usr/app

# Copy the built app from the build stage to the nginx public directory
COPY --from=build /usr/app/dist/client /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
