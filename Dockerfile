# Use a lightweight Nginx image
FROM nginx:alpine

# Set the working directory to Nginx's default HTML directory
WORKDIR /usr/share/nginx/html

# Copy all required files into the container
COPY index.html style.css mediaqueries.css script.js ./

# Copy the entire assets folder preserving structure
COPY assets/ assets/

# Expose port 80 for serving the website
EXPOSE 80
