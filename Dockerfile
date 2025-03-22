# Step 1: Use official Node.js image as base image
FROM node:18-alpine AS builder

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 4: Install dependencies
RUN npm install


# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Production stage
FROM node:18-alpine

# Step 8: Set working directory for the final container
WORKDIR /app

# Step 9: Copy only the necessary build files from the builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY package*.json ./

# Step 10: Expose the port your NestJS app will run on
EXPOSE 3000

# Step 11: Run the application in production mode
CMD ["npm", "run", "start:prod"]
