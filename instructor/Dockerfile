# This is a Dockerfile that describes how to build a Docker image for an instructor application
# based on Node.js.

# This specifies that the base image for the new image is the official Node.js image available on Docker Hub
FROM node 

# This sets the working directory for the commands that follow to /instructor.
WORKDIR /instructor

# This copies the package.json file from the current directory on the host machine
# to the  directory in the Docker image.
COPY package.json .

# This runs the npm install command to install the dependencies listed in the package.json file.
RUN npm install

# This copies all the files from the current directory on the host machine
# to the /instructor directory in the Docker image.
COPY . .

# This installs the nodemon package globally in the Docker image using the npm package manager.
# nodemon is a tool that automatically restarts the Node.js application when changes are made 
# to the code.
RUN npm i -g nodemon

# This specifies the command that will be executed when a container is started
# from the Docker image. The command is nodemon index.js, which starts the Node.js application
# and uses nodemon to monitor changes to the code and automatically restart the application 
# when changes are detected.
CMD ["nodemon", "index.js"]