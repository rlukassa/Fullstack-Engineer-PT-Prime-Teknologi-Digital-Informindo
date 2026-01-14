# Client Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
# Skip Cypress binary download (e2e tests run locally, not in Docker)
ENV CYPRESS_INSTALL_BINARY=0
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Start development server with host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
