# Stage 1: Build the React application
FROM node:14 as build

# Create a directory and go to the directory
WORKDIR /app

# Install Node Exporter
# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -LO https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-amd64.tar.gz && \
#     tar xvf node_exporter-1.2.2.linux-amd64.tar.gz && \
#     cp node_exporter-1.2.2.linux-amd64/node_exporter /usr/local/bin/

# Copy the package.json file to my current directory to install the necessary dependence  
COPY . .

# Install the dependencies & build the app
RUN npm install && npm run build

# Expose ports for Node.js app and Node Exporter
# EXPOSE 3000  
# EXPOSE 9100  

# Start Node.js application and Node Exporter
# CMD npm start & /usr/local/bin/node_exporter

# CMD ["npm", "start"]

# Stage 2: Serve the application with NGINX
FROM nginx:stable-perl as deploy

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the build output from the first stage
COPY --from=build /app/build .

# Copy NGINX configuration
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/cors.conf /etc/nginx/cors.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]