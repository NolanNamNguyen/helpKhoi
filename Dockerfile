# build environment
FROM node:16.10.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
ARG REACT_APP_ENDPOINT
ENV REACT_APP_ENDPOINT $REACT_APP_ENDPOINT
ARG REACT_APP_INTERVAL_TIME
ENV REACT_APP_INTERVAL_TIME $REACT_APP_INTERVAL_TIME
ARG REACT_APP_ENDPOINT_IMAGE
ENV REACT_APP_ENDPOINT_IMAGE $REACT_APP_ENDPOINT_IMAGE
ARG REACT_APP_ENDPOINT_SNAPSHOT
ENV REACT_APP_ENDPOINT_SNAPSHOT $REACT_APP_ENDPOINT_SNAPSHOT
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]