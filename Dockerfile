#specifying a base image: Nodejs
FROM node:12.18.1
RUN mkdir -p /GoRestaurant

#set a directory for the app
WORKDIR /GoRestaurant
# copy all the files to the container
COPY package.json .
# install dependencies
RUN npm install
COPY . .

# define the port number the container should expose
EXPOSE 3000

# run the command
CMD ["npm", "start"]

