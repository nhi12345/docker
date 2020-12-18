#############
### build ###
#############
# base image
FROM node:12.2.0 as build
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY ./package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@10.2.0
# add app
COPY . /app
# generate build
RUN ng build --output-path=dist --prod
############
### prod ###
############
# base image
FROM nginx:1.16.0-alpine
COPY nginx.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
# expose port 80
EXPOSE 80
# run nginx
CMD ["nginx", "-g", "daemon off;"]