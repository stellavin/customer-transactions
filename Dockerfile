
# # Stage 1
# # Create image based on the official Node 10 image from dockerhub

# FROM node:10-alpine

# # Create a directory where our app will be placed
# RUN mkdir -p /usr/src/app

# # Change directory so that our commands run inside this new directory

# WORKDIR /usr/src/app

# # Install dependecies

# RUN npm install -g @angular/cli@7.1.4
# RUN npm cache clean --force
# RUN npm install --save-dev

# # Get all the code needed to run the app

# COPY . /user/src/app
# RUN npm rebuild node-sass --force

# CMD ng serve --host 0.0.0.0 --port 4200

FROM node:10.4.1-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

EXPOSE 4200/tcp

CMD ng serve --host 0.0.0.0 --port 4200