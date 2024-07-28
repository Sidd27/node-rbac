# Use the official MongoDB image from Docker Hub
FROM mongo:latest

# Expose MongoDB default port
EXPOSE 27017

# Start MongoDB service with replica set configuration
CMD ["mongod", "--bind_ip_all", "--replSet", "rs0"]
