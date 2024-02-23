# Use the specified Node.js version
ARG NODE_VERSION=16.14.0
FROM node:${NODE_VERSION}-alpine

# Set the environment to production
ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci --omit=dev

# Switch to a non-root user
USER node

# Copy the rest of the source files into the image
COPY . .

# Expose the port that the application listens on
EXPOSE 8080

# Run the application
CMD npm start
