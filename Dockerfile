FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire source code
COPY . .

# Initialize TypeScript configuration 
RUN npx tsc --init

# Build the TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 4200

# Start the application
CMD ["npm", "start"]
