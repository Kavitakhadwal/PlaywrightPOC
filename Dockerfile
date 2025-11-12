# Use official Playwright image with browsers and dependencies
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Create app directory
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies. Use npm ci when lockfile is present, with a fallback to npm install.
RUN set -eux; \
    if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund || npm install --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# Copy the rest of the project
COPY . .

# Ensure Playwright browsers and deps are installed
RUN npx playwright install --with-deps || true

# Expose workspace TestData and playwright-report as optional mount points
VOLUME ["/app/TestData", "/app/playwright-report"]

# Default to running Playwright tests on Firefox. Override by passing a different CMD.
CMD ["npx", "playwright", "test", "--project=firefox"]
# Use official Node.js image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

# Install node modules from lockfile for reproducible builds
#RUN npm ci --no-audit --no-fund

# Copy application files
COPY . .

# Install Playwright browsers and required system dependencies
# The base image already contains browsers, but ensure any missing deps are installed
RUN npx playwright install 

# Build TypeScript if needed (uncomment if you have a build step)
# RUN npm run build

# Default command: run Playwright tests using Firefox in headless mode.
# You can override by passing a different command to `docker run`.
CMD ["npx", "playwright", "test", "--project=firefox"]
