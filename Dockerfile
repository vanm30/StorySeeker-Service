# Use the official Node.js image.
FROM node:18

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Install the app dependencies.
RUN npm install

# Copy the rest of the application source code.
COPY . .

# Expose the port the app runs on.
EXPOSE 8080

# Command to run the application.
CMD ["npm", "start"]