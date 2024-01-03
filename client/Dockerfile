FROM node:21-alpine3.18 AS Development

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4200

CMD [ "yarn", "start" ]

# Use an official Node.js runtime as a parent image
FROM node:14-alpine AS Production

# Set the working directory to /app
WORKDIR /usr/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the application dependencies
RUN yarn install --frozen-lockfile

# Copy the application files
COPY . .

# Build the Angular app
RUN yarn build --prod

# Use a smaller base image for the production environment
FROM nginx:alpine

# Copy the built app from the build stage to the nginx public directory
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
