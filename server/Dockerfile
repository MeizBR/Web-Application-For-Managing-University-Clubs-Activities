# Select a base image
FROM node:20.11.1-alpine

# Create a directory  and go to the directory 
WORKDIR /app

# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -LO https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-amd64.tar.gz && \
#     tar xvf node_exporter-1.2.2.linux-amd64.tar.gz && \
#     cp node_exporter-1.2.2.linux-amd64/node_exporter /usr/local/bin/

# Copy the package.json file to my current directory to install the necessary dependence  
COPY . .

# Install the dependence
RUN npm install

# Expose ports for both Node.js app and Node Exporter
# EXPOSE 5000
# EXPOSE 9100 

# Start both Node.js application and Node Exporter
# CMD npm start & /usr/local/bin/node_exporter

EXPOSE 5000

CMD ["npm", "start"]