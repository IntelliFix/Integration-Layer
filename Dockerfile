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

USER root

RUN apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    curl

# Download and install gcloud
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz && \
    mkdir -p /usr/local/gcloud && \
    tar -C /usr/local/gcloud -xvf /tmp/google-cloud-sdk.tar.gz && \
    /usr/local/gcloud/google-cloud-sdk/install.sh

# Add the gcloud binary path to the PATH environment variable
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

RUN gcloud --version

USER node

# Run the application
CMD npm start
