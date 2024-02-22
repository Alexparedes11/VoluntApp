# Use the official image as a parent image
FROM node:21-alpine3.18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Use Nginx for serving the Angular app
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=builder /dist/volunt-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]